import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainStationService } from 'src/app/services/train-station.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { HistoryModifiedStationService } from 'src/app/services/history-modified-station.service';
import { GEO_API } from 'src/environments/environment';

@Component({
  selector: 'app-detail-history-modified-station',
  templateUrl: './detail-history-modified-station.component.html',
  styleUrls: ['./detail-history-modified-station.component.css']
})
export class DetailHistoryModifiedStationComponent implements OnInit {
  id?: string;
  historyModifiedStation: any = {};
  imageUrls: string[] = [];

  isVisibleConfirmDelete = false;

  constructor(
    private route: ActivatedRoute,
    private historyModifiedStationService: HistoryModifiedStationService,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.historyModifiedStationService.getHistoryModifiedStationById(this.id!).subscribe(res => {
      this.historyModifiedStation = res.data;

      const params = {
        entityType: "TRAIN_STATION",
        fileType: "IMAGE",
        relationId: this.historyModifiedStation.trainStationResponse.id
      };

      this.storageService.getAllImagesByType(params).subscribe(res => {
        for (let image of res.data) {
          this.imageUrls.push(image.url);
        }
      })
    });

  }

  //handle event modal
  showModalConfrimDelete(): void {
    this.isVisibleConfirmDelete = true;
  }

  handleOk(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.historyModifiedStationService.deleteHistoryModifiedStationById(this.id!).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/train-station/history/list']);
        this.message.create("success", `Deleting the history modified station successful.`);
      } else {
        this.message.create("error", `Deleting the history modified station failed.`);
      }
    },
      (error) => {
        this.message.create("error", `Deleting the history modified station failed.`);
      }
    );

    this.isVisibleConfirmDelete = false;
  }

  handleCancel(): void {
    this.isVisibleConfirmDelete = false;
  }
}
