import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NonNullableFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Observer } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { TechnicalStatusService } from 'src/app/services/technical-status.service';
import { TrainStationService } from 'src/app/services/train-station.service';

@Component({
  selector: 'app-edit-technical-status',
  templateUrl: './edit-technical-status.component.html',
  styleUrls: ['./edit-technical-status.component.css']
})
export class EditTechnicalStatusComponent implements OnInit, OnDestroy {
  id?: string;
  technicalStatus: any = {};
  form!: FormGroup;

  imageList: NzUploadFile[] = [];
  imageUrls: string[] = [];
  imageIsAdded: string[] = [];
  imageIsDeleted: NzUploadFile[] = [];

  trainStations = [
    { label: 'None', value: 0 }
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
    private technicalStatusService: TechnicalStatusService,
    private trainStationService: TrainStationService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.technicalStatusService.getTechnicalStatusById(this.id!).subscribe(res => {
      this.technicalStatus = res.data;
      if(Object.keys(this.technicalStatus).length !== 0){
        this.form.get('trainStation')?.setValue(this.technicalStatus.trainStationResponse.id);
        this.form.get('state')?.setValue(this.technicalStatus.state);
        this.form.get('periodOfChecking')?.setValue(this.technicalStatus.periodOfChecking);
        this.form.get('dateChecking')?.setValue(this.technicalStatus.dateChecking);
        this.form.get('description')?.setValue(this.technicalStatus.description);
        this.form.get('requestRepair')?.setValue(this.technicalStatus.requestRepair);
      }
    });

    const params = {
      entityType: "TECHNICAL_STATUS",
      fileType: "IMAGE",
      relationId: this.id
    };

    this.storageService.getAllImagesByType(params).subscribe(res => {
      for (let image of res.data) {
        const newImage: any = {
          uid: `${Date.now()}`,
          name: image.name,
          status: 'done',
          url: image.url,
          thumbUrl: image.url
        };

        this.imageList = [...this.imageList, newImage];
        this.imageUrls.push(image.url);
      }
    });
  }

  handleImageChange(info: any): void {
    if (info.file.status === 'done') {
      const response = info.file.response;
      if (response && response.success) {
        this.imageUrls.push(response.data.url)
        this.imageIsAdded.push(response.data.name)
      }
    }
  }

  handleImageDelete = (file: any): Observable<boolean> => {
    let imageName: any;
    let imageUrl: any;

    if (file.response !== undefined) {
      imageName = file.response.data.name;
      imageUrl = file.response.data.url;
    } else {
      imageName = file.url.split('/').pop();
      imageUrl = file.url;
    }

    this.imageList = this.imageList.filter((element) => element !== file);
    this.imageIsAdded = this.imageIsAdded.filter((element) => element !== imageName);
    this.imageUrls = this.imageUrls.filter((element) => element !== imageUrl);
    this.imageIsDeleted.push(file);

    return of(false);
  }

  handleImageDeleteServer(file: any) {
    let imageName: any;
    if (file.response !== undefined) {
      imageName = file.response.data.name;
    } else {
      imageName = file.url.split('/').pop();
    }

    this.storageService.deleteImageByName(imageName).subscribe(res => {
    })
  }

  submitForm(): void {
    if (this.form?.valid) {
      const body = Object.assign(
        { ...this.form.getRawValue() },
        {
          imageUrls: this.imageUrls
        }
      )
      this.technicalStatusService.editTechnicalStatus(this.id!, body).subscribe(res => {
        if (res.success === true) {
          if (this.imageIsDeleted !== null) {
            for (let file of this.imageIsDeleted) {
              this.handleImageDeleteServer(file);
            }
          }
          this.imageUrls = [];
          this.imageIsAdded = [];
          this.router.navigate(['/technical-status/list']);
          this.message.create("success", `Successfully updated technical status.`);
        } else {
          this.message.create("error", `Updating technical status failed.`);
        }
      })
    } else {
      this.message.create("error", `Information is not valid.`);
    }
  }

  ngOnDestroy(): void {
    if (this.imageIsAdded !== null) {
      for (let name of this.imageIsAdded) {
        this.storageService.deleteImageByName(name).subscribe(res => { });
      }
    }
  }
}
