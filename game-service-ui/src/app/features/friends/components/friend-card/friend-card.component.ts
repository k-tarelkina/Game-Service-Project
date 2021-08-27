import {Component, Input, OnDestroy} from '@angular/core';
import {FriendRecordModel} from '../../../../core/models/friend.record.model';
import {FriendsService} from '../../../../core/services/friends-service/friends.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent implements OnDestroy {
  private _subscriptions = new Subscription();

  @Input() friendRecord!: FriendRecordModel;

  constructor(private friendsService: FriendsService) { }

  removeFriend(): void {
    const sub = this.friendsService
        .deleteFriend(this.friendRecord.friend._id)
        .subscribe(() => alert('The friend was deleted'));
    this._subscriptions.add(sub);
  }

  addFriend(): void {
    const sub = this.friendsService
        .addFriendRequestFromUser(this.friendRecord.friend._id)
        .subscribe(() => alert('The request was created'));
    this._subscriptions.add(sub);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
