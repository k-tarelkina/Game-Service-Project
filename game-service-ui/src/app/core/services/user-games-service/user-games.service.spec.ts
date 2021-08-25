import { TestBed } from '@angular/core/testing';
import { UserGamesService } from './user-games.service';
import {HttpService} from "../http-service/http.service";
import {GameModel} from "../../models/game.model";

describe('UserGamesService', () => {
  let service: UserGamesService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<GameModel>>;
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
    service = TestBed.inject(UserGamesService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<GameModel>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
