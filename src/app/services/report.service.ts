import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService) { }

  getAllReport(params?: any): Observable<any> {
    return this.apiService.get(`${API.REPORT.GET_ALL_REPORT}`, params);
  }

  getReportById(id: string): Observable<any> {
    return this.apiService.get(`${API.REPORT.GET_REPORT_BY_ID}${id}`);
  }

  addReport(body?: any): Observable<any> {
    return this.apiService.post(`${API.REPORT.ADD_REPORT}`, body);
  }

  editReport(id: string, body?: any): Observable<any> {
    return this.apiService.put(`${API.REPORT.EDIT_REPORT}${id}`, body);
  }

  deleteReportById(id: string): Observable<any> {
    return this.apiService.deleteMethod(`${API.REPORT.DELETE_REPORT}${id}`);
  }
}
