import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class GamesTagsService {
  private _URL = '/api/games/tags';

  constructor(private httpService: HttpService<string>) { }

  getAllTags$(): Observable<string[]> {
    return this.httpService.get(this._URL) as Observable<string[]>;
  }
}
