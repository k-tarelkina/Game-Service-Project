import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCardComponent } from './friend-card.component';

describe('FriendCardComponent', () => {
  let component: FriendCardComponent;
  let fixture: ComponentFixture<FriendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendCardComponent ]
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
    const element = fixture.debugElement.nativeElement.querySelector('.action');
    expect(element).toBeInstanceOf(HTMLParagraphElement);
    expect(element.textContent).toEqual('PENDING');
  })

  it('should render "Remove friend" button if the request status is ACCEPTED', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'ACCEPTED'
    };
    const element = fixture.debugElement.nativeElement.querySelector('.action');
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent).toEqual('Remove friend');
  })

  it('should render "Add friend" button if the request status is EMPTY', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'EMPTY'
    };
    const element = fixture.debugElement.nativeElement.querySelector('.action');
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent).toEqual('Add friend');
  })

  it('should render "Add friend" button if the request status is REJECTED', () => {
    component.friendRecord = {
      friend: {
        _id: '_id',
        username: 'username'
      },
      status: 'REJECTED'
    };
    const element = fixture.debugElement.nativeElement.querySelector('.action');
    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent).toEqual('Add friend');
  })
});
