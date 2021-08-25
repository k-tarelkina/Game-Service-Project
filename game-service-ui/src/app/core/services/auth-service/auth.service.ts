import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = '/api/auth';
  private LOGIN_URL = `${this.URL}/login`;
  private SIGN_UP_URL = `${this.URL}/sign_up`;

  private userSubject$: BehaviorSubject<UserModel | null>;

  constructor(private httpService: HttpService<Partial<UserModel> | UserModel>,
              private router: Router) {
    this.userSubject$ = new BehaviorSubject(this.getUser());
    this.listenToLocalStorageClear();
  }

  private listenToLocalStorageClear() {
    // @TODO? listenToLocalStorageClear
  }

  private getUser() {
    const item = localStorage.getItem('user');
    if (item) {
      return (JSON.parse(item)) as UserModel;
    }
    return null;
  }

  private setUser(user: Partial<UserModel>) {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  get user$(): Observable<UserModel> {
    return (this.userSubject$ as BehaviorSubject<UserModel>).asObservable();
  }

  get userValue() {
    return this.userSubject$.value;
  }

  login(email: string, password: string) {
    return this.httpService.post(this.LOGIN_URL, {email, password})
      .pipe(
        tap((user: Partial<UserModel>) => {
          this.setUser(user);
          this.userSubject$.next(user as UserModel);
          this.router.navigate(['']);
      }));
  }

  logout() {
    this.removeUser();
    this.userSubject$.next(null);
    this.router.navigate(['/auth/login']);
  }
}
