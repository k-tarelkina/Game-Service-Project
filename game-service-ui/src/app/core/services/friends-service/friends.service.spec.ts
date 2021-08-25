import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';
import {HttpService} from "../http-service/http.service";
import {FriendRecordModel} from "../../models/friend.record.model";
import {of} from "rxjs";

describe('FriendsService', () => {
  const _FRIENDS_URL = '/api/users/me/friends';
  let service: FriendsService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<FriendRecordModel>>;

  beforeEach(() => {
    const httpSpy = {
      get: jasmine.createSpy('get')
    };
    TestBed.configureTestingModule({
      providers: [
        FriendsService,
        {
          provide: HttpService,
          useValue: httpSpy
        }
      ]
    });
    service = TestBed.inject(FriendsService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<FriendRecordModel>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getFriendsRequestsToUser should return friends requests made to current user', () => {
    // const mockFriendsRecords = [{
    //   selfId: '611a28cd4b4b997150481510',
    //   friend: {
    //     _id: '611a28cd4b4b997150481511',
    //     username: 'username'
    //   },
    //   status: 'PENDING'
    // }];
    service.getFriendsRequestsToUser();
    expect(httpServiceSpy.get).toHaveBeenCalledWith(_FRIENDS_URL,
      {params: {status: 'PENDING'}});
  })

  it('#getFriendsRequestsFromUser should return friends requests made by current user', () => {
    service.getFriendsRequestsFromUser();
    expect(httpServiceSpy.get).toHaveBeenCalledWith(_FRIENDS_URL,
      {params: {status: 'PENDING', userAs: 'self'}});
  })

  it('#getAllFriends', () => {
    service.getAllFriends();
    expect(httpServiceSpy.get).toHaveBeenCalledWith(_FRIENDS_URL);
  })

  it('#getFriendsByUsername', () => {
    const username = 'username';
    service.getFriendsByUsername(username);
    expect(httpServiceSpy.get).toHaveBeenCalledWith(_FRIENDS_URL,
      {params: {username}});
  })
});
