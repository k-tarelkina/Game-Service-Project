import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FriendsPageComponent} from './friends-page.component';
import {FriendsService} from '../../../../core/services/friends-service/friends.service';
import {of} from 'rxjs';

describe('FriendsPageComponent', () => {
  let component: FriendsPageComponent;
  let fixture: ComponentFixture<FriendsPageComponent>;
  const friendsSpy = jasmine.createSpyObj('FriendsService',
      ['getFriendsByUsername', 'getAllFriends']);
  friendsSpy.getAllFriends.and.returnValue(of([]));
  friendsSpy.getFriendsByUsername.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsPageComponent],
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
    fixture = TestBed.createComponent(FriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
