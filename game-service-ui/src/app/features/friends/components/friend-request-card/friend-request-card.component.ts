import {Component, Input, OnInit} from '@angular/core';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";

@Component({
  selector: 'app-friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss']
})
export class FriendRequestCardComponent {
  @Input() friendRequest!: FriendRecordModel;

  constructor(private friendsService: FriendsService) { }

  rejectFriend(): void {
    this.friendsService.deleteFriend(this.friendRequest.friend._id);
  }

  acceptFriend(): void {
    this.friendsService.acceptFriendRequest(this.friendRequest.friend._id);
  }
}
