import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { FriendsContainerComponent } from './components/friends-container/friends-container.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';


@NgModule({
  declarations: [
    FriendsPageComponent,
    FriendsContainerComponent,
    FriendCardComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ]
})
export class FriendsModule { }
