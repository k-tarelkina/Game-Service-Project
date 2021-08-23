import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpService} from "../http-service/http.service";
import {Router} from "@angular/router";

describe('AuthService', () => {
  let service: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<any>>;
  const httpSpy = {
    get: jasmine.createSpy('get')
  }
  let routerServiceSpy: jasmine.SpyObj<Router>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: httpSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<any>>;
    routerServiceSpy =  TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#logout should log out user correctly', () => {
    service.logout();
    expect(service.userValue).toBeNull();
    const localStorageItem = localStorage.getItem('user');
    expect(localStorageItem).toBeNull();
  })
});
