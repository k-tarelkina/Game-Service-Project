import {Component, Input, OnDestroy} from '@angular/core';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss']
})
export class FriendRequestCardComponent implements OnDestroy {
  private _subscriptions = new Subscription();

  @Input() friendRequest!: FriendRecordModel;

  constructor(private friendsService: FriendsService) { }

  rejectFriend(): void {
    const sub = this.friendsService
      .deleteFriend(this.friendRequest.friend._id)
      .subscribe(() => alert('The request was rejected'));
    this._subscriptions.add(sub);
  }

  acceptFriend(): void {
    const sub = this.friendsService
      .acceptFriendRequest(this.friendRequest.friend._id)
      .subscribe(() => alert('The friend was added'));
    this._subscriptions.add(sub);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
