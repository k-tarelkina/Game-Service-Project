import { TestBed } from '@angular/core/testing';
import { GamesTagsService } from './games-tags.service';
import {HttpService} from "../http-service/http.service";

describe('GamesTagsService', () => {
  let service: GamesTagsService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<string>>;
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
    service = TestBed.inject(GamesTagsService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<string>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
