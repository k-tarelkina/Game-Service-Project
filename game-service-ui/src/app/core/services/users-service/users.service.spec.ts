import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpService} from "../http-service/http.service";
import {UserModel} from "../../models/user.model";

describe('UsersService', () => {
  let service: UsersService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<UserModel>>;
  const httpSpy = jasmine.createSpyObj('HttpService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: httpSpy
        }
      ]
    });
    service = TestBed.inject(UsersService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<UserModel>>
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
