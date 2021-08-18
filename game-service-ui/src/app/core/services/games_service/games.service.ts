import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private URL = '/api/games';

  constructor(private httpService: HttpService<Game>) { }

  private formHttpParams() {

  }

  getAllGames$(params?: Object): Observable<Game[]> {
    if (params) {
      const httpParams = this.httpService.formHttpParams(params);
      return this.httpService.get(this.URL, {params: httpParams}) as Observable<Game[]>;
    }
    return this.httpService.get(this.URL) as Observable<Game[]>;
  }
}
