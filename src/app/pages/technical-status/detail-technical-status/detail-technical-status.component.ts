import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TechnicalStatusService } from 'src/app/services/technical-status.service';

@Component({
  selector: 'app-detail-technical-status',
  templateUrl: './detail-technical-status.component.html',
  styleUrls: ['./detail-technical-status.component.css']
})
export class DetailTechnicalStatusComponent implements OnInit {
  id?: string;
  technicalStatus: any = {};
  imageUrls: string[] = [];
  nameStation?: string;

  isVisibleConfirmDelete = false;

  constructor(
    private route: ActivatedRoute,
    private technicalStatusService: TechnicalStatusService,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.technicalStatusService.getTechnicalStatusById(this.id!).subscribe(res => {
      this.technicalStatus = res.data;
      this.nameStation = this.technicalStatus.trainStationResponse.nameStation;
    });

    const params = {
      entityType: "TECHNICAL_STATUS",
      fileType: "IMAGE",
      relationId: this.id
    };

    this.storageService.getAllImagesByType(params).subscribe(res => {
      for (let image of res.data) {
        this.imageUrls.push(image.url);
      }
    },
      (error) => { }
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

    this.technicalStatusService.deleteTechnicalStatusById(this.id!).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/technical-status/list']);
        this.message.create("error", `Deleting the technical status successful.`);
      } else {
        this.message.create("error", `Deleting the technical status failed.`);
      }
    });

    this.isVisibleConfirmDelete = false;
  }

  handleCancel(): void {
    this.isVisibleConfirmDelete = false;
  }
}
