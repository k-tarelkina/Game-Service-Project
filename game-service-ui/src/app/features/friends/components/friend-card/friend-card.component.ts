import {Component, Input, OnInit} from '@angular/core';
import {FriendModel} from "../../../../core/models/friend.model";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() friend!: FriendModel;

  constructor() { }

  ngOnInit(): void {
  }

}
