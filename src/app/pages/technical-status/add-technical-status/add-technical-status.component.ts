import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Observer } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { TechnicalStatusService } from 'src/app/services/technical-status.service';
import { TrainStationService } from 'src/app/services/train-station.service';

@Component({
  selector: 'app-add-technical-status',
  templateUrl: './add-technical-status.component.html',
  styleUrls: ['./add-technical-status.component.css']
})
export class AddTechnicalStatusComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  imageList: NzUploadFile[] = [];
  imageUrls: string[] = [];
  imageNames: string[] = [];

  trainStations = [
    { label: 'None', value: '0' }
  ];

  states = [
    { label: 'Very good', value: 'Very good' },
    { label: 'Good', value: 'Good' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Bad', value: 'Bad' },
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router,
    private technicalStatusService: TechnicalStatusService,
    private trainStationService: TrainStationService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      trainStation: ['', [Validators.required]],
      state: ['', [Validators.required]],
      periodOfChecking: ['', [Validators.required]],
      dateChecking: ['', [Validators.required]],
      description: ['', [Validators.required]],
      requestRepair: [false, [Validators.required]],
    });

    this.trainStationService.getAllNameStaitons().subscribe(res => {
      for (let station of res.data) {
        const s = { label: station.nameStation, value: station.id };
        this.trainStations.push(s);
      }
    });
  }

  handleImageChange(info: any): void {
    if (info.file.status === 'done') {
      const response = info.file.response;
      if (response && response.success) {
        this.imageUrls.push(response.data.url);
        this.imageNames.push(response.data.name);
      }
    }
  }

  handleImageDelete = (file: any): Observable<boolean> => {
    const imageName = file.response.data.name;
    const imageUrl = file.response.data.url;

    return this.storageService.deleteImageByName(imageName)
      .pipe(
        map(() => {
          this.imageNames = this.imageNames.filter((element) => element !== imageName);
          this.imageUrls = this.imageUrls.filter((element) => element !== imageUrl);
          return true;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  submitForm(): void {
    if (this.form?.valid) {
      const body = Object.assign(
        { ...this.form.getRawValue() },
        {
          imageUrls: this.imageUrls
        }
      )
      this.technicalStatusService.addTechnicalStatus(body).subscribe(res => {
        if (res.success === true) {
          this.imageUrls = [];
          this.imageNames = [];
          this.router.navigate(['/technical-status/list']);
          this.message.create("success", `Successfully created technical status.`);
        } else {
          this.message.create("error", `Creating technical status failed.`);
        }
      },
        (error) => {
          this.message.create("error", `Creating technical status failed.`);
        }
      )
    } else {
      this.message.create("error", `Information is not valid.`);
    }
  }

  ngOnDestroy(): void {
    if (this.imageNames !== null) {
      for (let name of this.imageNames) {
        this.storageService.deleteImageByName(name).subscribe(res => { });
      }
    }
  }
}
