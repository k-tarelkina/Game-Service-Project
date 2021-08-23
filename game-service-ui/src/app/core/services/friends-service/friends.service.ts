import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {FriendRecordModel} from "../../models/friend.record.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _FRIENDS_URL = '/api/users/me/friends';

  constructor(private httpService: HttpService<FriendRecordModel>) { }

  getFriendsRequestsToUser(): Observable<FriendRecordModel[]> {
    return this.httpService
      .get(this._FRIENDS_URL,
        {params: {status: 'PENDING'}}) as Observable<FriendRecordModel[]>;
  }

  getFriendsRequestsFromUser(): Observable<FriendRecordModel[]> {
    return this.httpService
      .get(this._FRIENDS_URL,
        {params: {status: 'PENDING', userAs: 'self'}}) as Observable<FriendRecordModel[]>;
  }

  getUserFriends(): Observable<FriendRecordModel[]> {
    return this.httpService
      .get(this._FRIENDS_URL) as Observable<FriendRecordModel[]>;
  }

  getFriendsByUsername(username: string): Observable<FriendRecordModel[]>{
    return this.httpService
      .get(this._FRIENDS_URL,
        {params: {username}}) as Observable<FriendRecordModel[]>;
  }
}
