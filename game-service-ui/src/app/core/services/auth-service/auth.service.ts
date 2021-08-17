import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = '/api/auth';
  LOGIN_URL = `${URL}/login`;
  SIGN_UP_URL = `${URL}/sign_up`;

  user$: BehaviorSubject<User | null>;

  constructor(private httpService: HttpService<Partial<User> | User>,
              private router: Router) {
    this.user$ = new BehaviorSubject(this.getUser());
  }

  private getUser() {
    const item = localStorage.getItem('user');
    if (item) {
      return JSON.parse(item) as User;
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

  login(email: string, password: string) {
    this.httpService.post(this.LOGIN_URL, {email, password})
      .pipe(
        map((user: Partial<User>) => {
          this.setUser(user);
          this.user$.next(user as User);
          console.log(user);
          return user;
      }))
  }

  logout() {
    this.removeUser();
    this.user$.next(null);
    this.router.navigate(['/auth/login']);
  }

}
