import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsRequestsContainerComponent } from './friends-requests-container.component';
import {FriendsService} from "../../../../core/services/friends-service/friends.service";
import {of} from "rxjs";

describe('FriendsRequestsContainerComponent', () => {
  let component: FriendsRequestsContainerComponent;
  let fixture: ComponentFixture<FriendsRequestsContainerComponent>;
  let friendsSpy = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsRequestsContainerComponent ],
      providers: [
        {
          provide: FriendsService,
          useValue: friendsSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
