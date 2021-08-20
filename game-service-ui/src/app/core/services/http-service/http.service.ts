import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  constructor(private http: HttpClient) { }

  completeUrl(url: string) {
    return `${environment.apiUrl}${url}`
  }

  formHttpParams(params: Object): HttpParams {
    let httpParams = new HttpParams();
    for (let [key, val] of Object.entries(params)) {
      console.log(key, val);
      if (Array.isArray(val)) {
        for (let value of val) {
          httpParams = httpParams.append(`${key}[]`, value);
        }
      } else {
        console.log('set: ', key, val);
        httpParams = httpParams.set(key, val);
      }
    }
    console.log(httpParams.toString())
    return httpParams;
  }

  get(url: string, options?: Object): Observable<T | T[]> {
    return this.http.get<T>(this.completeUrl(url), options);
  }

  post(url: string, data: T, options?: Object): Observable<T> {
    return this.http.post<T>(this.completeUrl(url), data);
  }

  put(url: string, data?: T): Observable<T> {
    console.log('put')
    console.log(this.completeUrl(url))
    console.log(data)
    return this.http.put<T>(this.completeUrl(url), data)
      .pipe(
        catchError((err => {
          console.log(err)
          return of(err);
        })),
        tap(res => console.log(res))
      );
  }
}
