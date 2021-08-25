import {Component, Input, OnInit} from '@angular/core';
import {FriendModel} from "../../../../core/models/friend.model";
import {FriendRecordModel} from "../../../../core/models/friend.record.model";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent {
  @Input() friendRecord!: FriendRecordModel;

  constructor(private friendsService: FriendsService) { }

  removeFriend(): void {
    this.friendsService.deleteFriend(this.friendRecord.friend._id);
  }

  addFriend(): void {
    console.log('adding...')
    this.friendsService.addFriendRequestFromUser(this.friendRecord.friend._id).subscribe(
      (res) => console.log(res));
  }

  logFriend(): void {
    console.log(this.friendRecord);
  }
}
