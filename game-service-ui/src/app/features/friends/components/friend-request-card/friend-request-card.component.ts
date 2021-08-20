import {Component, Input, OnInit} from '@angular/core';
import {FriendRecordModel} from "../../../../core/models/friend.record.model";

@Component({
  selector: 'app-friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss']
})
export class FriendRequestCardComponent implements OnInit {
  @Input() request!: FriendRecordModel;

  constructor() { }

  ngOnInit(): void {
  }

}
