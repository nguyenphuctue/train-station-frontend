import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { TrainStationService } from 'src/app/services/train-station.service';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {
  id?: string;
  report: any = {};
  nameStation?: string;
  trainStation: any = {};

  isVisibleConfirmDelete = false;
  isVisiblePreview = false;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.reportService.getReportById(this.id!).subscribe(res => {
      this.report = res.data;
      this.nameStation = this.report.trainStationResponse.nameStation;
      this.trainStation = this.report.trainStationResponse;
    });
  }

  //handle event modal delete
  showModalConfrimDelete(): void {
    this.isVisibleConfirmDelete = true;
  }

  handleDeleteOk(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.reportService.deleteReportById(this.id!).subscribe(res => {
      if (res.success === true) {
        this.router.navigate(['/report/list']);
        this.message.create("error", `Deleting the report successful.`);
      } else {
        this.message.create("error", `Deleting the report failed.`);
      }
    });

    this.isVisibleConfirmDelete = false;
  }

  handleDeleteCancel(): void {
    this.isVisibleConfirmDelete = false;
  }

  downloadAsPDF(): void {
    const element = document.querySelector('.report-preview-container') as HTMLElement;
  
    if (element) {
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 paper width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('report.pdf');
      });
    }
  }

  //handle event modal review
  showModalPreview(): void {
    this.isVisiblePreview = true;
  }

  handlePreviewOk(): void {
    this.downloadAsPDF();
    this.isVisiblePreview = false;
  }

  handlePreviewCancel(): void {
    this.isVisiblePreview = false;
  }
}
