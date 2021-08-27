import {TestBed} from '@angular/core/testing';

import {AuthInterceptor} from './auth.interceptor';
import {HttpService} from '../../core/services/http-service/http.service';
import {AuthService} from '../../core/services/auth-service/auth.service';

describe('AuthInterceptor', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const authSpy = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {
          provide: AuthService,
          useValue: authSpy,
        },
      ],
    });
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
