import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendsContainerComponent } from './components/friends-container/friends-container.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { FriendsRequestsContainerComponent } from './components/friends-requests-container/friends-requests-container.component';
import { FriendRequestCardComponent } from './components/friend-request-card/friend-request-card.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    FriendsPageComponent,
    FriendsContainerComponent,
    FriendCardComponent,
    FriendsRequestsContainerComponent,
    FriendRequestCardComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule
  ]
})
export class FriendsModule { }
