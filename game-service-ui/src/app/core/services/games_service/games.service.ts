import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private GAMES_URL = '/api/games';
  private MY_GAMES_URL = 'api/me/games'

  constructor(private httpService: HttpService<Game>) { }

  private formHttpParams() {

  }

  getAllGames$(params?: Object): Observable<Game[]> {
    if (params) {
      const httpParams = this.httpService.formHttpParams(params);
      return this.httpService.get(this.GAMES_URL, {params: httpParams}) as Observable<Game[]>;
    }
    return this.httpService.get(this.GAMES_URL) as Observable<Game[]>;
  }

  getUserGames$(): Observable<Game[]> {
    return this.httpService.get(this.MY_GAMES_URL) as Observable<Game[]>;
  }
}
