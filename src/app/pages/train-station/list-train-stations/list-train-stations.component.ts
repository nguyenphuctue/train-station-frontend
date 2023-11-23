import { Component, OnInit } from '@angular/core';
import { TrainStationService } from 'src/app/services/train-station.service';


@Component({
  selector: 'app-list-train-stations',
  templateUrl: './list-train-stations.component.html',
  styleUrls: ['./list-train-stations.component.css']
})
export class ListTrainStationsComponent implements OnInit {

  trainStationList: any[] = [];

  loading = false;
  total = 0;
  pageIndex = 1;
  pageSize = 5;

  keySearch?: string = '';
  filterProperty?: any = '';
  sortDistance?: string = '';

  properties = [
    { label: 'Ga bắt đầu', value: 'Ga bắt đầu' },
    { label: 'Ga kết thúc', value: 'Ga kết thúc' },
    { label: 'Ga lập tàu', value: 'Ga lập tàu' },
    { label: 'Ga trung gian', value: 'Ga trung gian' },
    { label: 'Ga nhường tránh', value: 'Ga nhường tránh' },
    { label: 'Ga tiền cảng', value: 'Ga tiền cảng' },
    { label: 'None', value: '' }
  ];

  constructor(private trainStationService: TrainStationService) {

  }

  ngOnInit(): void {
    this.fetchData();
  }

  getCellStylesOfProperty(property: string): { [key: string]: string } {
    const styleMap: { [key: string]: { 'background-color': string } } = {
      'Ga bắt đầu': { 'background-color': 'Tomato' },
      'Ga kết thúc': { 'background-color': 'Orange' },
      'Ga lập tàu': { 'background-color': 'DodgerBlue' },
      'Ga trung gian': { 'background-color': 'MediumSeaGreen' },
      'Ga nhường tránh': { 'background-color': 'SlateBlue' },
      'Ga tiền cảng': { 'background-color': 'Violet' },
    };
    return styleMap[property] || {};
  }

  fetchData(){
    const params = {
      page: this.pageIndex-1,
      size: this.pageSize,
      search: this.keySearch,
      property: this.filterProperty,
      sort: this.sortDistance
    }
    this.trainStationService.getAllTrainStaitons(params).subscribe(res => {
      this.trainStationList = res.data.content;
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
