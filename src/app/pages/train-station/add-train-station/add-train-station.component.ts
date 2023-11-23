import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainStationService } from 'src/app/services/train-station.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-train-station',
  templateUrl: './add-train-station.component.html',
  styleUrls: ['./add-train-station.component.css']
})
export class AddTrainStationComponent implements OnInit, OnDestroy {
  isVisible = false;

  locationOfTrainStation: any = {
    type: 'Point',
    coordinates: null
  };

  boundaryOfTrainStation: any = {
    type: 'Polygon',
    coordinates: null
  };

  properties = [
    { label: 'Ga bắt đầu', value: 'Ga bắt đầu' },
    { label: 'Ga kết thúc', value: 'Ga kết thúc' },
    { label: 'Ga lập tàu', value: 'Ga lập tàu' },
    { label: 'Ga trung gian', value: 'Ga trung gian' },
    { label: 'Ga nhường tránh', value: 'Ga nhường tránh' },
    { label: 'Ga tiền cảng', value: 'Ga tiền cảng' }
  ];

  form!: FormGroup;

  imageList: NzUploadFile[] = [];
  imageUrls: string[] = [];
  imageNames: string[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private trainStationService: TrainStationService,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nameStation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      distanceFromStart: ['', [Validators.required]],
      distanceToEnd: ['', [Validators.required]],
      propertiesOfStation: ['Ga trung gian', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  onLocationChange(updatedLocation: any) {
    this.locationOfTrainStation = updatedLocation;
    this.form.get('longitude')?.setValue(this.locationOfTrainStation.coordinates[0]);
    this.form.get('latitude')?.setValue(this.locationOfTrainStation.coordinates[1]);
  }

  onBoundaryChange(updatedBoundary: any) {
    this.boundaryOfTrainStation = updatedBoundary;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleImageChange(info: any): void {
    if (info.file.status === 'done') {
      const response = info.file.response;
      if (response && response.success) {
        this.imageUrls.push(response.data.url)
        this.imageNames.push(response.data.name)
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
          location: this.locationOfTrainStation,
          boundary: this.boundaryOfTrainStation
        },
        {
          imageUrls: this.imageUrls
        }
      )
      this.trainStationService.addTrainStation(body).subscribe(res => {
        if (res.success === true) {
          this.imageUrls = [];
          this.imageNames = [];
          this.router.navigate(['/train-station/list']);
          this.message.create("success", `Successfully created train station.`);
        } else {
          this.message.create("error", `Creating train station failed.`);
        }
      },
        (error) => {
          this.message.create("error", `Creating train station failed.`);
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
