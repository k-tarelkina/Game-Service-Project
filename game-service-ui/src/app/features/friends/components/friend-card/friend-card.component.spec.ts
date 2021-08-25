import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FriendCardComponent } from './friend-card.component';
import {of} from "rxjs";
import {FriendsService} from "../../../../core/services/friends-service/friends.service";

describe('FriendCardComponent', () => {
  let component: FriendCardComponent;
  let fixture: ComponentFixture<FriendCardComponent>;
  let friendsSpy = jasmine.createSpyObj('FriendsService',
    ['addFriendRequestFromUser', 'deleteFriend']);
  const actionsCSSClass = '.actions';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendCardComponent ],
      providers: [
        {
          provide: FriendsService,
          useValue: friendsSpy
        },
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render paragraph with "PENDING" text if the request status is PENDING', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'PENDING'
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(actionsCSSClass);
    expect(element).toBeInstanceOf(HTMLParagraphElement);
    expect(element.textContent.trim()).toEqual('PENDING');
  })

  it('should render "Remove friend" button if the request status is ACCEPTED', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'ACCEPTED'
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(actionsCSSClass);
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent.trim()).toEqual('Remove friend');
  })

  it('should render "Add friend" button if the request status is EMPTY', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'EMPTY'
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(actionsCSSClass);
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent.trim()).toEqual('Add friend');
  })

  it('should render "Add friend" button if the request status is REJECTED', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'REJECTED'
    };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(actionsCSSClass);
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent.trim()).toEqual('Add friend');
  })
});
