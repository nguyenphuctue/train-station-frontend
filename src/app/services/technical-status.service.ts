import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TechnicalStatusService {

  constructor(private apiService: ApiService) { }

  getAllTechnicalStatus(params?: any): Observable<any>{
    return this.apiService.get(`${API.TECHNICAL_STATUS.GET_ALL_TECHNICAL_STATUS}`, params);
  }

  getTechnicalStatusById(id: string): Observable<any>{
    return this.apiService.get(`${API.TECHNICAL_STATUS.GET_TECHNICAL_STATUS_BY_ID}${id}`);
  }

  addTechnicalStatus(body?: any): Observable<any>{
    return this.apiService.post(`${API.TECHNICAL_STATUS.ADD_TECHNICAL_STATUS}`, body);
  }

  editTechnicalStatus(id: string, body?: any): Observable<any>{
    return this.apiService.put(`${API.TECHNICAL_STATUS.EDIT_TECHNICAL_STATUS}${id}`, body);
  }

  deleteTechnicalStatusById(id: string): Observable<any>{
    return this.apiService.deleteMethod(`${API.TECHNICAL_STATUS.DELETE_TECHNICAL_STATUS}${id}`);
  }

  getAllRequestRepair(params?: any): Observable<any>{
    return this.apiService.get(`${API.TECHNICAL_STATUS.GET_ALL_REQUEST_REPAIR}`, params);
  }

  deleteRequestRepair(id: string): Observable<any>{
    return this.apiService.deleteMethod(`${API.TECHNICAL_STATUS.DELETE_REQUEST_REPAIR}${id}`);
  }
}
