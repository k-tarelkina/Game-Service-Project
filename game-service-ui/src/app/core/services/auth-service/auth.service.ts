import {Injectable} from '@angular/core';
import {HttpService} from '../http-service/http.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {ResponseBody} from '../../models/response.body';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _URL = '/api/auth';
  private _CURRENT_USER_URL = '/api/users/me';
  private _LOGIN_URL = `${this._URL}/login`;
  private _SIGN_UP_URL = `${this._URL}/sign_up`;

  private _userSubject$ = new BehaviorSubject<UserModel | null>(null);

  constructor(private httpService: HttpService<Partial<UserModel> | UserModel>,
              private router: Router) {
    this._userSubject$.next(this.getUserFromStorage());
  }

  private getUserFromStorage() {
    const item = localStorage.getItem('user');
    if (item) {
      return (JSON.parse(item)) as UserModel;
    }
    return null;
  }

  private setUserToStorage(user: Partial<UserModel>) {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
  }

  private removeUserFromStorage() {
    localStorage.removeItem('user');
  }

  get user$(): Observable<UserModel> {
    return (this._userSubject$ as BehaviorSubject<UserModel>).asObservable();
  }

  get userValue() {
    return this._userSubject$.value;
  }

  login(email: string, password: string) {
    return this.httpService.post(this._LOGIN_URL, {email, password})
        .pipe(
            tap((user: Partial<UserModel>) => {
              this.setUserToStorage(user);
              this._userSubject$.next(user as UserModel);
              this.router.navigate(['']);
            }));
  }

  logout() {
    this.removeUserFromStorage();
    this._userSubject$.next(null);
    this.router.navigate(['/auth/login']);
  }

  updateUser(data: Partial<UserModel>): Observable<ResponseBody> {
    return this.httpService.patch(this._CURRENT_USER_URL, data)
        .pipe(
            tap(() => {
              const newUser = {...this.userValue, ...data};
              this.setUserToStorage(newUser);
              this._userSubject$.next(newUser as UserModel);
            }));
  }
}
