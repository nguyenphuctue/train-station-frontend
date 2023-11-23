import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TechnicalStatusService } from 'src/app/services/technical-status.service';

@Component({
  selector: 'app-list-request-repair',
  templateUrl: './list-request-repair.component.html',
  styleUrls: ['./list-request-repair.component.css']
})
export class ListRequestRepairComponent implements OnInit {
  technicalStatusList: any[] = [];
  isVisibleConfirmDelete = false;

  loading = false;
  total = 0;
  pageIndex = 1;
  pageSize = 5;

  keySearch?: string = '';
  filterState?: any = '';
  sortDateChecking?: any = '';

  states = [
    { label: 'Very good', value: 'Very good' },
    { label: 'Good', value: 'Good' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Bad', value: 'Bad' },
    { label: 'None', value: '' }
  ];

  constructor(
    private technicalStatusService: TechnicalStatusService,
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  getStyleOfState(property: any): string {
    const colorMap: { [key: string]: string } = {
      'Very good': 'green',
      'Good': 'blue',
      'Moderate': 'orange',
      'Bad': 'red',
    };
    return colorMap[property] || 'magenta';
  }

  fetchData() {
    const params = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      search: this.keySearch,
      state: this.filterState,
      sort: this.sortDateChecking
    }
    this.technicalStatusService.getAllRequestRepair(params).subscribe(res => {
      this.technicalStatusList = res.data.content;
      this.total = res.data.totalElements;
    })
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.fetchData();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.fetchData();
  }

  deleteRequestRepair(id: any) {
    this.technicalStatusService.deleteRequestRepair(id!).subscribe(res => {
      if (res.success === true) {
        window.location.reload();
        this.message.create("success", `Successfully deleted request repair.`);
      } else {
        this.message.create("error", `Deleting request repair failed.`);
      }
    })
  }
  //handle event modal
  showModalConfrimDelete(): void {
    this.isVisibleConfirmDelete = true;
  }

  handleOk(id: any): void {
    this.deleteRequestRepair(id);
    this.isVisibleConfirmDelete = false;
  }

  handleCancel(): void {
    this.isVisibleConfirmDelete = false;
  }

}
