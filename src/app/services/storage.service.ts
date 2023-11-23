import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { STORAGE_API } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getAllImagesByType(params?: any): Observable<any>{
    return this.apiService.get(`${API.IMAGE.GET_IMAGES_BY_TYPE}`, params);
  }

  deleteImageByName(imageName: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete(`${STORAGE_API.GATEWAY_URL}${STORAGE_API.IMAGE.DELETE_IMAGE}${imageName}`, { headers });
  }
}
