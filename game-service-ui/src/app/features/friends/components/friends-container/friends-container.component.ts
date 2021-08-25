import {Component, Input} from '@angular/core';
import { FriendModel } from 'src/app/core/models/friend.model';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";

@Component({
  selector: 'app-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.scss']
})
export class FriendsContainerComponent {
  @Input() friends!: FriendRecordModel[];
}
