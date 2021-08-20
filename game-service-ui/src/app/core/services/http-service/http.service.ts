import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observablekt.tarelkina@gmail.com
} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  constructor(private http: HttpClient) { }

  completeUrl(url: string) {
    return `${environment.apiUrl}${url}`
  }

  get(url: string): Observable<T> {
    return this.http.get<T>(this.completeUrl(url));
  }

  post(url: string, data: T, options?: Object): Observable<T> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let allOptions = {headers, ...options};
    return this.http.post<T>(this.completeUrl(url), data);
  }
}
