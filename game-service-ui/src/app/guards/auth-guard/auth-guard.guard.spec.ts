import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.guard';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth-service/auth.service";

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;
  let routerServiceSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const authSpy = jasmine.createSpyObj('AuthService', [], ['user$'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: AuthService,
          useValue: authSpy
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
