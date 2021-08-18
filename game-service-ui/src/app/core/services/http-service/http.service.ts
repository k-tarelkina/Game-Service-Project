import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  constructor(private http: HttpClient) { }

  completeUrl(url: string) {
    return `${environment.apiUrl}${url}`
  }

  formHttpParams(params: Object): HttpParams {
    const httpParams = new HttpParams();
    for (let [key, val] of Object.entries(params)) {
      if (Array.isArray(val)) {
        for (let value of val) {
          httpParams.append(`${key}[]`, value);
        }
      } else {
        httpParams.set(key, val);
      }
    }
    return httpParams;
  }

  get(url: string, options?: Object): Observable<T | T[]> {
    return this.http.get<T>(this.completeUrl(url), options);
  }

  post(url: string, data: T, options?: Object): Observable<T> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let allOptions = {headers, ...options};
    return this.http.post<T>(this.completeUrl(url), data);
  }
}
