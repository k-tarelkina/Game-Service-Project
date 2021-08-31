import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpService} from '../http-service/http.service';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user.model';
import {of} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  let httpServiceSpy: jasmine.SpyObj<HttpService<UserModel>>;
  const httpSpy= jasmine.createSpyObj('HttpService', ['post', 'patch']);

  let routerServiceSpy: jasmine.SpyObj<Router>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const credentials = {
    email: 'email@email.com',
    password: 'password',
  };
  const user = {
    ...credentials,
    _id: '_id',
    username: 'username',
    token: 'token',
  };
  const CURRENT_USER_URL = '/api/users/me';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpService,
          useValue: httpSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpServiceSpy = TestBed.inject(HttpService) as
      jasmine.SpyObj<HttpService<any>>;
    httpServiceSpy.post.and.returnValue(of(user));
    httpServiceSpy.patch.and.returnValue(of());
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('#login should log in user correctly', (done) => {
      service.login(credentials.email, credentials.password)
          .subscribe((userReturned) => {
            expect(userReturned).toEqual(user);
            expect(service.userValue).toEqual(user);
            done();
          });
    });

    it('#login should place user to local storage', (done) => {
      service.login(credentials.email, credentials.password)
          .subscribe((user) => {
            const localStorageItem = localStorage.getItem('user');
            expect(localStorageItem).not.toBeNull();
            if (localStorageItem) {
              const userFromLocalStorage = JSON.parse(localStorageItem);
              expect(userFromLocalStorage).toEqual(user);
            }
            done();
          });
    });

    it('#login should navigate to the home page', (done) => {
      service.login(credentials.email, credentials.password)
          .subscribe((user) => {
            expect(routerServiceSpy.navigate).toHaveBeenCalledWith(['']);
            done();
          });
    });
  });

  describe('logout', () => {
    it('#logout should log out user correctly', (done) => {
      service.login(credentials.email, credentials.password)
          .subscribe(() => done());
      service.logout();
      expect(service.userValue).toBeNull();
      const localStorageItem = localStorage.getItem('user');
      expect(localStorageItem).toBeNull();
    });

    it('#logout should navigate to /auth/login', (done) => {
      service.login(credentials.email, credentials.password)
          .subscribe(() => done());
      service.logout();
      expect(routerServiceSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });

  describe('update', () => {
    it('#updateUser should call PATCH with user datas', () => {
      service.updateUser(user);
      expect(httpServiceSpy.patch).toHaveBeenCalledWith(CURRENT_USER_URL, user);
    });
  });
});
