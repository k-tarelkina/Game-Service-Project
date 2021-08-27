import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendRequestCardComponent} from './friend-request-card.component';
import {FriendsService} from '../../../../core/services/friends-service/friends.service';

describe('FriendRequestCardComponent', () => {
  let component: FriendRequestCardComponent;
  let fixture: ComponentFixture<FriendRequestCardComponent>;
  const friendsSpy = jasmine.createSpyObj('FriendsService',
      ['acceptFriendRequest', 'deleteFriend']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendRequestCardComponent],
      providers: [
        {
          provide: FriendsService,
          useValue: friendsSpy,
        },
      ],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
