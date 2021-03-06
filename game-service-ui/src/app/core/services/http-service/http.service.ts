import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  constructor(private http: HttpClient) { }

  completeUrl(url: string) {
    return `${environment.apiUrl}${url}`;
  }

  formHttpParams(params: Object): HttpParams {
    let httpParams = new HttpParams();
    for (const [key, val] of Object.entries(params)) {
      if (Array.isArray(val)) {
        for (const value of val) {
          httpParams = httpParams.append(`${key}[]`, value);
        }
      } else {
        httpParams = httpParams.set(key, val);
      }
    }
    return httpParams;
  }

  get(url: string, options?: Object): Observable<T | T[]> {
    return this.http.get<T>(this.completeUrl(url), options);
  }

  post(url: string, data: T, options?: Object): Observable<T> {
    return this.http.post<T>(this.completeUrl(url), data);
  }

  put(url: string, data?: T): Observable<T | Object> {
    return this.http.put<T>(this.completeUrl(url), data);
  }

  patch(url: string, data: Object): Observable<any> {
    return this.http.patch(this.completeUrl(url), data);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.completeUrl(url));
  }
}
