import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {FriendRecordModel} from "../../models/friend.record.model";
import {BehaviorSubject, Observable, of, pipe} from "rxjs";
import {ResponseBody} from "../../models/response.body";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _FRIENDS_URL = '/api/users/me/friends';
  private _requestsSubject$ = new BehaviorSubject<FriendRecordModel[]>([]);
  private _friendsSubject$ = new BehaviorSubject<FriendRecordModel[]>([]);

  constructor(private httpService: HttpService<FriendRecordModel>) {
    this.loadRequests();
    this.loadFriends();
  }

  private catchErrorAndReturnEmptyObservable(err: Error) {
    console.error(err);
    return of([]);
  }

  private loadRequests() {
    this.getFriendsRequestsToUser()
      .pipe(
        catchError(this.catchErrorAndReturnEmptyObservable)
      )
      .subscribe(requests => {
        this._requestsSubject$.next(requests);
      })
  }

  private loadFriends() {
    this.getAllFriends()
      .pipe(
        catchError(this.catchErrorAndReturnEmptyObservable)
      )
      .subscribe(friends => {
        this._friendsSubject$.next(friends);
      })
  }

  private emitFriends(friends: FriendRecordModel[]) {
    this._friendsSubject$.next(friends);
  }

  get requests$(): Observable<FriendRecordModel[]> {
    return this._requestsSubject$.asObservable();
  }

  get friends$(): Observable<FriendRecordModel[]> {
    return this._friendsSubject$.asObservable();
  }

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

  getAllFriends(): Observable<FriendRecordModel[]> {
    return (this.httpService
      .get(this._FRIENDS_URL) as Observable<FriendRecordModel[]>)
      .pipe(
        tap((friends) => this.emitFriends(friends))
      );
  }

  getFriendsByUsername(username: string): Observable<FriendRecordModel[]>{
    return (this.httpService
      .get(this._FRIENDS_URL,
        {params: {username}}) as Observable<FriendRecordModel[]>)
      .pipe(
        tap((friends) => this.emitFriends(friends))
      );
  }

  addFriendRequestFromUser(friendId: string): Observable<ResponseBody> {
    return (this.httpService
      .put(`${(this._FRIENDS_URL)}/${friendId}`) as Observable<ResponseBody>)
      .pipe(
        tap(() => this.loadFriends())
      );
  }

  acceptFriendRequest(friendId: string): Observable<ResponseBody> {
    return this.httpService
      .patch(`${(this._FRIENDS_URL)}/${friendId}`, {status: 'ACCEPTED'})
      .pipe(
        tap(() => {
          this.loadFriends();
          this.loadRequests();
        })
      );
  }

  deleteFriend(friendId: string): Observable<ResponseBody> {
    return this.httpService
      .delete(`${(this._FRIENDS_URL)}/${friendId}`)
      .pipe(
        tap(() => {
          this.loadFriends();
          this.loadRequests();
        })
      );
  }
}
