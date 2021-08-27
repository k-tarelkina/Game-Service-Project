import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../http-service/http.service';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  _USERS_URL = '/api/users';

  constructor(private httpService: HttpService<UserModel>) { }

  getUsersByUsername(username: string): Observable<UserModel[]> {
    return this.httpService
        .get(this._USERS_URL, {params: {username}}) as Observable<UserModel[]>;
  }
}
