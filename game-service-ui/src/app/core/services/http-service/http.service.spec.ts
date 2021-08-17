import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HttpService', () => {
  let service: HttpService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
