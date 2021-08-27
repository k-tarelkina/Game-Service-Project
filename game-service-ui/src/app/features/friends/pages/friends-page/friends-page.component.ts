import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FriendsService,
} from '../../../../core/services/friends-service/friends.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FriendRecordModel} from '../../../../core/models/friend.record.model';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit, OnDestroy {
  private _searchText$ = new BehaviorSubject<string>('');
  private _subscriptions = new Subscription();

  friends$!: Observable<FriendRecordModel[]>;

  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.friends$ = this.friendsService.friends$;
    const sub = this._searchText$
        .pipe(
            concatMap((text) => {
              if (text.length) {
                return this.friendsService.getFriendsByUsername(text);
              }
              return this.friendsService.getAllFriends();
            }),
        ).subscribe();
    this._subscriptions.add(sub);
  }

  search(searchText: string) {
    this._searchText$.next(searchText);
  }

  getTitle(): string {
    const searchText = this._searchText$.value;
    return searchText.length ? `Search Friends: ${searchText}` : 'My friends';
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
