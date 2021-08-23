import {Component, Input, OnInit} from '@angular/core';
import {FriendModel} from "../../../../core/models/friend.model";
import {FriendRecordModel} from "../../../../core/models/friend.record.model";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() friendRecord!: FriendRecordModel;

  constructor() { }

  ngOnInit(): void {
  }

}
