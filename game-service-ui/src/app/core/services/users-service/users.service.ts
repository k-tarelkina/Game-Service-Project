import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FriendModel} from "../../models/friend.model";
import {map} from "rxjs/operators";
import {HttpService} from "../http-service/http.service";
import {UserModel} from "../../models/user.model";
import {ResponseBody} from "../../models/response.body";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _USERS_URL = '/api/users';
  _CURRENT_USER_URL = '/api/users/me';

  constructor(private httpService: HttpService<UserModel>) { }

  getUsersByUsername(username: string): Observable<UserModel[]> {
    return this.httpService
      .get(this._USERS_URL, {params: {username}}) as Observable<UserModel[]>;
  }

  updateCurrentUser(data: Partial<UserModel>): Observable<ResponseBody> {
    return this.httpService.patch(this._CURRENT_USER_URL, data);
  }
}
