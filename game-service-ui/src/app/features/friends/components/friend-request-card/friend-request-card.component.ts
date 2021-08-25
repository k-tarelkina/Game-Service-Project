import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {ResponseBody} from "../../../../core/models/response.body";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss']
})
export class FriendRequestCardComponent implements OnDestroy {
  @Input() friendRequest!: FriendRecordModel;
  private subscription = new Subscription();

  constructor(private friendsService: FriendsService) { }

  rejectFriend(): void {
    const sub = this.friendsService
      .deleteFriend(this.friendRequest.friend._id)
      .subscribe(() => alert('The request was rejected'));
    this.subscription.add(sub);
  }

  acceptFriend(): void {
    const sub = this.friendsService
      .acceptFriendRequest(this.friendRequest.friend._id)
      .subscribe(() => alert('The friend was added'));
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
