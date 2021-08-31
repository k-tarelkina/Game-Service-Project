import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FriendRequestCardComponent} from './friend-request-card.component';
import {
  FriendsService,
} from '../../../../core/services/friends-service/friends.service';
import {of} from 'rxjs';

describe('FriendRequestCardComponent', () => {
  let component: FriendRequestCardComponent;
  let fixture: ComponentFixture<FriendRequestCardComponent>;
  const friendsSpy = jasmine.createSpyObj('FriendsService',
      ['acceptFriendRequest', 'deleteFriend']);
  friendsSpy.acceptFriendRequest.and.returnValue(of());
  friendsSpy.deleteFriend.and.returnValue(of());
  const friend = {
    _id: '_id',
    username: 'username',
  };

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
    component.friendRequest = {
      friend,
      status: 'PENDING',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render friend username', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#friend-username');
    expect(element.textContent).toContain(friend.username);
  });

  it('should call #acceptFriendRequest from FriendsService on "Accept" button click',
      waitForAsync(async () => {
        const acceptButton: HTMLButtonElement = fixture.nativeElement
            .querySelector('#acceptButton');
        acceptButton.click();
        await fixture.whenStable();
        expect(friendsSpy.acceptFriendRequest).toHaveBeenCalledWith(friend._id);
      }));

  it('should call #deleteFriend from FriendsService on "Remove" button click',
      waitForAsync(async () => {
        const rejectButton: HTMLButtonElement = fixture.nativeElement
            .querySelector('#rejectButton');
        rejectButton.click();
        await fixture.whenStable();
        expect(friendsSpy.deleteFriend).toHaveBeenCalledWith(friend._id);
      }));
});
