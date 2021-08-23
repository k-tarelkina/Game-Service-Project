import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {concatMap} from "rxjs/operators";
import {UsersService} from "../../../../core/services/users-service/users.service";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit, OnDestroy {
  private searchText$ = new BehaviorSubject<string>('');
  friends$ = new BehaviorSubject<FriendRecordModel[]>([]);
  private subscription!: Subscription;

  constructor(private friendsService: FriendsService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.subscription = this.searchText$
      .pipe(
        concatMap(text => {
          if (text.length) {
            return this.friendsService.getFriendsByUsername(text);
          }
          return this.friendsService.getUserFriends();
        })
      ).subscribe((friends) => {
      this.friends$.next(friends);
    })
  }

  search(searchText: string) {
    this.searchText$.next(searchText);
  }

  getTitle(): string {
    const searchText = this.searchText$.value;
    return searchText.length ? `Search Friends: ${searchText}` : 'My friends';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
