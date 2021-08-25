import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import {HttpService} from "../http-service/http.service";
import {GameModel} from "../../models/game.model";
import {of} from "rxjs";

describe('GamesService', () => {
  let service: GamesService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<GameModel>>;
  const httpSpy = jasmine.createSpyObj('HttpService', ['get']);
  httpSpy.get.and.returnValue(of([]));

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
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<GameModel>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
