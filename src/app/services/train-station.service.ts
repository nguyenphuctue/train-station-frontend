import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainStationService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer' + this.authService.accessToken);

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  getAllTrainStaitons(params?: any): Observable<any> {
    return this.apiService.get(`${API.TRAIN_STATION.GET_ALL_TRAIN_STATIONS}`, params);
  }

  getAllNameStaitons(): Observable<any> {
    return this.apiService.get(`${API.TRAIN_STATION.GET_ALL_NAME_STATIONS}`);
  }

  getTrainStaitonById(id: string): Observable<any> {
    return this.apiService.get(`${API.TRAIN_STATION.GET_TRAIN_STATION_BY_ID}${id}`);
  }

  addTrainStation(body?: any): Observable<any> {
    return this.apiService.post(`${API.TRAIN_STATION.ADD_TRAIN_STATION}`, body);
  }

  editTrainStation(id: string, body?: any): Observable<any> {
    return this.apiService.put(`${API.TRAIN_STATION.EDIT_TRAIN_STATION}${id}`, body);
  }

  deleteTrainStaitonById(id: string): Observable<any> {
    return this.apiService.deleteMethod(`${API.TRAIN_STATION.DELETE_TRAIN_STATION}${id}`);
  }

  
}
