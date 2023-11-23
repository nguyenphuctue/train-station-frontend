import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryModifiedStationService {

  constructor(private apiService: ApiService) { }

  getAllHistoryModifiedStations(params?: any): Observable<any>{
    return this.apiService.get(`${API.HISTORY_MODIFIED_STATION.GET_ALL_HISTORY_MODIFIED_STATIONS}`, params);
  }

  getHistoryModifiedStationById(id: string): Observable<any>{
    return this.apiService.get(`${API.HISTORY_MODIFIED_STATION.GET_HISTORY_MODIFIED_STATION_BY_ID}${id}`);
  }

  deleteHistoryModifiedStationById(id: string): Observable<any> {
    return this.apiService.deleteMethod(`${API.HISTORY_MODIFIED_STATION.DELETE_HISTORY_MODIFIED_STATION}${id}`);
  }
}
