import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {FriendRecordModel} from "../../models/friend.record.model";
import {Observable} from "rxjs";
import {UserModel} from "../../models/user.model";
import {map} from "rxjs/operators";
import {FriendModel} from "../../models/friend.model";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _FRIENDS_URL = '/api/users/me/friends';
  private _USERS_URL = '/api/users';

  constructor(private httpService: HttpService<FriendRecordModel | FriendModel | UserModel>) { }

  getFriendsRequests(): Observable<FriendRecordModel[]> {
    return this.httpService
      .get(this._FRIENDS_URL, {params: {status: 'PENDING'}}) as Observable<FriendRecordModel[]>;
  }

  getUserFriends(): Observable<FriendRecordModel[]> {
    return this.httpService.get(this._FRIENDS_URL) as Observable<FriendRecordModel[]>;
  }
}
