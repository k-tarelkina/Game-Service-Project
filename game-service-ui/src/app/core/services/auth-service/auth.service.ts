import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = '/api/auth';
  private LOGIN_URL = `${this.URL}/login`;
  private SIGN_UP_URL = `${this.URL}/sign_up`;

  private userSubject$: BehaviorSubject<User | null>;

  constructor(private httpService: HttpService<Partial<User> | User>,
              private router: Router) {
    this.userSubject$ = new BehaviorSubject(this.getUser());
  }

  private getUser() {
    const item = localStorage.getItem('user');
    if (item) {
      return (JSON.parse(item)) as User;
    }
    return null;
  }

  private setUser(user: Partial<User>) {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  get user$() {
    return this.userSubject$.asObservable();
  }

  get userValue() {
    return this.userSubject$.value;
  }

  login(email: string, password: string) {
    return this.httpService.post(this.LOGIN_URL, {email, password})
      .pipe(
        map((user: Partial<User>) => {
          this.setUser(user);
          this.userSubject$.next(user as User);
          return user;
      }));
  }

  logout() {
    this.removeUser();
    this.userSubject$.next(null);
    this.router.navigate(['/auth/login']);
  }

}
