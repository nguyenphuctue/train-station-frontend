import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NonNullableFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainStationService } from 'src/app/services/train-station.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from 'src/app/services/storage.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-edit-train-station',
  templateUrl: './edit-train-station.component.html',
  styleUrls: ['./edit-train-station.component.css']
})
export class EditTrainStationComponent implements OnInit, OnDestroy {
  isVisible = false;
  id?: string;
  trainStation: any = {};

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
  imageIsAdded: string[] = [];
  imageIsDeleted: NzUploadFile[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private trainStationService: TrainStationService,
    private storageService: StorageService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nameStation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      distanceFromStart: ['', [Validators.required]],
      distanceToEnd: ['', [Validators.required]],
      propertiesOfStation: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.trainStationService.getTrainStaitonById(this.id!).subscribe(res => {
      this.trainStation = res.data;
      if (Object.keys(this.trainStation).length !== 0) {
        this.form.get('nameStation')?.setValue(this.trainStation.nameStation);
        this.form.get('address')?.setValue(this.trainStation.address);
        this.form.get('longitude')?.setValue(this.trainStation.longitude);
        this.form.get('latitude')?.setValue(this.trainStation.latitude);
        this.form.get('distanceFromStart')?.setValue(this.trainStation.distanceFromStart);
        this.form.get('distanceToEnd')?.setValue(this.trainStation.distanceToEnd);
        this.form.get('propertiesOfStation')?.setValue(this.trainStation.propertiesOfStation);
        this.form.get('note')?.setValue(this.trainStation.note);
        this.locationOfTrainStation = this.trainStation.location;
        this.boundaryOfTrainStation = this.trainStation.boundary;
      }
    });

    const params = {
      entityType: "TRAIN_STATION",
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
    },
      (error) => {
        console.log("Train station does not have images.");
      }
    );
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
          location: this.locationOfTrainStation,
          boundary: this.boundaryOfTrainStation
        },
        {
          imageUrls: this.imageUrls
        }
      )
      this.trainStationService.editTrainStation(this.id!, body).subscribe(res => {
        if (res.success === true) {
          if (this.imageIsDeleted !== null) {
            for (let file of this.imageIsDeleted) {
              this.handleImageDeleteServer(file);
            }
          }
          this.imageUrls = [];
          this.imageIsAdded = [];
          this.router.navigate(['/train-station/list']);
          this.message.create("success", `Successfully updated train station.`);
        } else {
          this.message.create("error", `Updating train station failed.`);
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
    if (this.imageIsAdded !== null) {
      for (let name of this.imageIsAdded) {
        this.storageService.deleteImageByName(name).subscribe(res => { });
      }
    }
  }
}
