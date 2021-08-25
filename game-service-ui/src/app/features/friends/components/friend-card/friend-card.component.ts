import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {ResponseBody} from "../../../../core/models/response.body";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnDestroy {
  @Input() friendRecord!: FriendRecordModel;
  private subscription = new Subscription();

  constructor(private friendsService: FriendsService) { }

  removeFriend(): void {
    const sub = this.friendsService
      .deleteFriend(this.friendRecord.friend._id)
      .subscribe(() => alert('The friend was deleted'));
    this.subscription.add(sub);
  }

  addFriend(): void {
    const sub = this.friendsService
      .addFriendRequestFromUser(this.friendRecord.friend._id)
      .subscribe(() => alert('The request was created'));
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
