import { Component, OnInit } from '@angular/core';
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {Observable, of} from "rxjs";
import {FriendRecordModel} from "../../../../core/models/friend.record.model";

@Component({
  selector: 'app-friends-requests-container',
  templateUrl: './friends-requests-container.component.html',
  styleUrls: ['./friends-requests-container.component.scss']
})
export class FriendsRequestsContainerComponent implements OnInit {
  requests$!: Observable<FriendRecordModel[]>;

  constructor(private friendService: FriendsService) { }

  ngOnInit(): void {
    this.requests$ = of([]);// this.friendService.getFriendsRequestsToUser();
  }
}
