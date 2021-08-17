import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post(url: string, data: T): Observable<T> {
    console.log('post in http')
    return this.http.post<T>(url, data);
  }

}
