import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {FriendRecordModel} from "../../models/friend.record.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _URL = '/api/users/me/friends'

  constructor(private httpService: HttpService<FriendRecordModel>) { }

  getFriendsRequests(): Observable<FriendRecordModel[]> {
    return this.httpService
      .get(this._URL, {params: {status: 'PENDING'}}) as Observable<FriendRecordModel[]>;
  }
}
