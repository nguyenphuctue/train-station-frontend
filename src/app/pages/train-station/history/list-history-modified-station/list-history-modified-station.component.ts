import { Component, OnInit } from '@angular/core';
import { HistoryModifiedStationService } from 'src/app/services/history-modified-station.service';

@Component({
  selector: 'app-list-history-modified-station',
  templateUrl: './list-history-modified-station.component.html',
  styleUrls: ['./list-history-modified-station.component.css']
})
export class ListHistoryModifiedStationComponent implements OnInit {
  historyModifiedStation: any[] = [];

  loading = false;
  total = 0;
  pageIndex = 1;
  pageSize = 5;

  keySearch?: string = "";
  sort?: string = "";

  constructor(private historyModifiedStationService: HistoryModifiedStationService) {

  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const params = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      search: this.keySearch,
      sort: this.sort
    }
    this.historyModifiedStationService.getAllHistoryModifiedStations(params).subscribe(res => {
      this.historyModifiedStation = res.data.content;
      this.total = res.data.totalElements;
    })
  }

  sortByNameStaion() {
    if (this.sort === "") {
      this.sort = "nameStation";
    } else {
      this.sort = "";
    }
    this.fetchData();
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
