import { Component, OnInit } from '@angular/core';
import { TechnicalStatusService } from 'src/app/services/technical-status.service';

@Component({
  selector: 'app-list-technical-status',
  templateUrl: './list-technical-status.component.html',
  styleUrls: ['./list-technical-status.component.css']
})
export class ListTechnicalStatusComponent implements OnInit {
  technicalStatusList: any[] = [];

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
    private technicalStatusService: TechnicalStatusService
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
    this.technicalStatusService.getAllTechnicalStatus(params).subscribe(res => {
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
}
