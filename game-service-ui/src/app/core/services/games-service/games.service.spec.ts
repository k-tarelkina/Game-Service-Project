import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";

describe('GamesService', () => {
  let service: GamesService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<Game>>;
  const httpSpy = jasmine.createSpyObj('HttpService', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: httpSpy
        }
      ]
    });
    service = TestBed.inject(GamesService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<Game>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
