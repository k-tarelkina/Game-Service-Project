import {TestBed} from '@angular/core/testing';
import {FriendsService} from './friends.service';
import {HttpService} from '../http-service/http.service';
import {FriendRecordModel} from '../../models/friend.record.model';
import {of} from 'rxjs';

describe('FriendsService', () => {
  const _FRIENDS_URL = '/api/users/me/friends';
  let service: FriendsService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<FriendRecordModel>>;
  const httpSpy = jasmine.createSpyObj('HttpService',
      ['get', 'put', 'patch', 'delete']);
  httpSpy.get.and.returnValue(of([]));
  const FRIENDS_URL = '/api/users/me/friends';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FriendsService,
        {
          provide: HttpService,
          useValue: httpSpy,
        },
      ],
    });
    service = TestBed.inject(FriendsService);
    httpServiceSpy = TestBed.inject(HttpService) as
      jasmine.SpyObj<HttpService<FriendRecordModel>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getting friends', () => {
    it('#getFriendsRequestsToUser should call #get from HttpService with appropriate params',
        () => {
          service.getFriendsRequestsToUser();
          expect(httpServiceSpy.get)
              .toHaveBeenCalledWith(_FRIENDS_URL,
                  {params: {status: 'PENDING'}});
        });

    it('#getFriendsRequestsFromUser should call #get from HttpService with appropriate params',
        () => {
          service.getFriendsRequestsFromUser();
          expect(httpServiceSpy.get)
              .toHaveBeenCalledWith(_FRIENDS_URL,
                  {params: {status: 'PENDING', userAs: 'self'}});
        });

    it('#getAllFriends should call #get from HttpService with friends URL only',
        () => {
          service.getAllFriends();
          expect(httpServiceSpy.get)
              .toHaveBeenCalledWith(_FRIENDS_URL);
        });

    it('#getFriendsByUsername should call #get from HttpService with appropriate params',
        () => {
          const username = 'username';
          service.getFriendsByUsername(username);
          expect(httpServiceSpy.get)
              .toHaveBeenCalledWith(_FRIENDS_URL,
                  {params: {username}});
        });
  });

  describe('adding friends', () => {
    it('#addFriendRequestFromUser should call #put from HttpService on /api/users/me/friends/:id',
        () => {
          httpServiceSpy.put.and.returnValue(of({}));
          const friendId = 'id';
          service.addFriendRequestFromUser(friendId);
          expect(httpServiceSpy.put)
              .toHaveBeenCalledWith(`${FRIENDS_URL}/${friendId}`);
        });

    it('#acceptFriendRequest should call #patch from HttpService with appropriate params',
        () => {
          httpServiceSpy.patch.and.returnValue(of({}));
          const friendId = 'id';
          service.acceptFriendRequest(friendId);
          expect(httpServiceSpy.patch)
              .toHaveBeenCalledWith(
                  `${FRIENDS_URL}/${friendId}`,
                  {status: 'ACCEPTED'});
        });
  });

  describe('deleting friends', () => {
    it('#deleteFriend should call #delete from HttpService on /api/users/me/friends/:id',
        () => {
          httpServiceSpy.delete.and.returnValue(of({}));
          const friendId = 'id';
          service.deleteFriend(friendId);
          expect(httpServiceSpy.delete)
              .toHaveBeenCalledWith(`${FRIENDS_URL}/${friendId}`);
        });
  });
});
