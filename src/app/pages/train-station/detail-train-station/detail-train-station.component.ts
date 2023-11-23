import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainStationService } from 'src/app/services/train-station.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail-train-station',
  templateUrl: './detail-train-station.component.html',
  styleUrls: ['./detail-train-station.component.css']
})
export class DetailTrainStationComponent implements OnInit {
  id?: string;
  trainStation: any = {};
  imageUrls: string[] = [];

  isVisibleConfirmDelete = false;

  constructor(
    private route: ActivatedRoute,
    private trainStationService: TrainStationService,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.trainStationService.getTrainStaitonById(this.id!).subscribe(res => {
      this.trainStation = res.data;
    });

    const params = {
      entityType: "TRAIN_STATION",
      fileType: "IMAGE",
      relationId: this.id
    };

    this.storageService.getAllImagesByType(params).subscribe(res => {
      for (let image of res.data) {
        this.imageUrls.push(image.url);
      }
    },
      (error) => {
        console.log("Train station does not have images.");
      }
    )
  }

  //handle event modal
  showModalConfrimDelete(): void {
    this.isVisibleConfirmDelete = true;
  }

  handleOk(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.trainStationService.deleteTrainStaitonById(this.id!).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/train-station/list']);
        this.message.create("success", `Deleting the train station successful.`);
      } else {
        this.message.create("error", `Deleting the train station failed.`);
      }
    },
      (error) => {
        this.message.create("error", `Deleting the train station failed. Please check technical status and report.`);
      }
    );

    this.isVisibleConfirmDelete = false;
  }

  handleCancel(): void {
    this.isVisibleConfirmDelete = false;
  }
}
