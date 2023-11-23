import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API, GEO_API } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApiHost(url: string) {
    return `${API.GATEWAY_URL}${url}`;
  }

  get(url: string, params?: any, httpHeaders?: HttpHeaders): Observable<any> {
    return this.http.get(this.getApiHost(url), {
      headers: httpHeaders,
      observe: 'body',
      params: this.buildHttpParams(params)
    });
  }

  post(url: string, body: any, params?: any, reqOptions?: any): Observable<any> {
    return this.http.post(this.getApiHost(url), body,
      {
        responseType: reqOptions?.responseType || 'json',
        params: this.buildHttpParams(params)
      }
    );
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(this.getApiHost(url), body);
  }

  // delete(url: string) {
  //   const headers = { 'Content-Type': 'application/json' };
  //   return this.http.put(this.getApiHost(url), { headers });
  // }

  deleteMethod(url: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete(this.getApiHost(url), { headers });
  }

  buildHttpParams(paramObj: any): HttpParams {
    let params = new HttpParams();
    const keys = paramObj ? Object.keys(paramObj) : null;
    if (keys && keys.length > 0) {
      keys.forEach((key, i) => {
        if (key) {
          params = params.set(key, `${paramObj[key]}`);
        }
      })
    }
    return params;
  }

  getGeoApi(url: string, params?: any, httpHeaders?: HttpHeaders): Observable<any> {
    return this.http.get(`${GEO_API.GATEWAY_URL}${url}`, {
      headers: httpHeaders,
      observe: 'body',
      params: this.buildHttpParams(params)
    });
  }

  // getByUrl(url: string, params?: any, httpHeaders?: HttpHeaders): Observable<any> {
  //   return this.http.get(url, {
  //     headers: httpHeaders,
  //     observe: 'body',
  //     params: this.buildHttpParams(params)
  //   });
  // }

}
