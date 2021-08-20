import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRequestsContainerComponent } from './friends-requests-container.component';

describe('FriendsRequestsContainerComponent', () => {
  let component: FriendsRequestsContainerComponent;
  let fixture: ComponentFixture<FriendsRequestsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsRequestsContainerComponent ]
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
