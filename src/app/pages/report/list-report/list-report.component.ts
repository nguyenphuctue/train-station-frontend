import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
  reportList: any[] = [];

  loading = false;
  total = 0;
  pageIndex = 1;
  pageSize = 5;

  keySearch?: string = '';
  filterState?: any = '';
  sort?: any = '';

  states = [
    { label: 'Very good', value: 'Very good' },
    { label: 'Good', value: 'Good' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Bad', value: 'Bad' },
    { label: 'None', value: '' }
  ];

  constructor(
    private reportService: ReportService
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
      sort: this.sort
    }
    this.reportService.getAllReport(params).subscribe(res => {
      this.reportList = res.data.content;
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
