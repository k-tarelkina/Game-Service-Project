import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect, waitForAsync,
} from '@angular/core/testing';
import {FriendCardComponent} from './friend-card.component';
import {
  FriendsService,
} from '../../../../core/services/friends-service/friends.service';
import {of} from 'rxjs';

describe('FriendCardComponent', () => {
  let component: FriendCardComponent;
  let fixture: ComponentFixture<FriendCardComponent>;
  const friendsSpy = jasmine.createSpyObj('FriendsService',
      ['addFriendRequestFromUser', 'deleteFriend']);
  friendsSpy.addFriendRequestFromUser.and.returnValue(of());
  friendsSpy.deleteFriend.and.returnValue(of());
  const actionsCSSClass = '.actions';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendCardComponent],
      providers: [
        {
          provide: FriendsService,
          useValue: friendsSpy,
        },
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render friend username', () => {
    const friend = {
      _id: '_id',
      username: 'username',
    };
    component.friendRecord = {
      friend,
      status: 'EMPTY',
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#friend-username');
    expect(element.textContent).toContain(friend.username);
  });

  it('should render element with "PENDING" text if the request status is PENDING',
      () => {
        component.friendRecord = {
          friend: {
            _id: '_id',
            username: 'username',
          },
          status: 'PENDING',
        };
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector(actionsCSSClass);
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element.textContent).toContain('PENDING');
      });

  it('should render "Remove friend" button if the request status is ACCEPTED',
      () => {
        component.friendRecord = {
          friend: {
            _id: '_id',
            username: 'username',
          },
          status: 'ACCEPTED',
        };
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector(actionsCSSClass);
        expect(element).toBeInstanceOf(HTMLButtonElement);
        expect(element.textContent).toContain('Remove friend');
      });

  it('should render "Add friend" button if the request status is EMPTY',
      () => {
        component.friendRecord = {
          friend: {
            _id: '_id',
            username: 'username',
          },
          status: 'EMPTY',
        };
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector(actionsCSSClass);
        expect(element).toBeInstanceOf(HTMLButtonElement);
        expect(element.textContent).toContain('Add friend');
      });

  it('should render "Add friend" button if the request status is REJECTED',
      () => {
        component.friendRecord = {
          friend: {
            _id: '_id',
            username: 'username',
          },
          status: 'REJECTED',
        };
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector(actionsCSSClass);
        expect(element).toBeInstanceOf(HTMLButtonElement);
        expect(element.textContent).toContain('Add friend');
      });

  it('should call #addFriendRequestFromUser from FriendsService on "Add" button click',
      waitForAsync(async () => {
        const friend = {
          _id: '_id',
          username: 'username',
        };
        component.friendRecord = {
          friend,
          status: 'EMPTY',
        };
        fixture.detectChanges();

        const addButton = fixture.nativeElement
            .querySelector(actionsCSSClass);
        addButton.click();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(friendsSpy.addFriendRequestFromUser)
            .toHaveBeenCalledWith(friend._id);
      }));

  it('should call #deleteFriend from FriendsService on "Remove" button click',
      waitForAsync(async () => {
        const friend = {
          _id: '_id',
          username: 'username',
        };
        component.friendRecord = {
          friend,
          status: 'ACCEPTED',
        };
        fixture.detectChanges();

        const removeButton = fixture.nativeElement
            .querySelector(actionsCSSClass);
        removeButton.click();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(friendsSpy.deleteFriend)
            .toHaveBeenCalledWith(friend._id);
      }));
});
