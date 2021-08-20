import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, concatMap, tap} from "rxjs/operators";
import {UserGamesService} from "../user-games-service/user-games.service";

export interface GamesOptions {
  name?: string,
  tags?: string[],
  maxPrice?: number
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private _GAMES_URL = '/api/games';
  private _gamesSubject$ = new BehaviorSubject<Game[]>([]);
  private _filters!: Object | null;
  private _searchText!: string;

  constructor(private httpService: HttpService<Game>,
              private userGamesService: UserGamesService) {
    this.preloadGames();
  }

  private preloadGames() {
    this.getAllGames$()
      .pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe((games) => {
        this._gamesSubject$.next(games)
      });
  }

  set filters(filtersToSet: Object | null) {
    this._filters = filtersToSet;
  }

  set searchText(text: string) {
    this._searchText = text;
  }

  get games$(): Observable<Game[]> {
    return this._gamesSubject$.asObservable();
  }

  applyOptions$(options: GamesOptions): Observable<Game[]> {
    console.log('options', options);
    return this.getAllGames$(options)
      .pipe(
        tap(games => {
          this._gamesSubject$.next(games);
        }));
  }

  getAllGames$(params?: GamesOptions): Observable<Game[]> {
    if (params) {
      const httpParams = this.httpService.formHttpParams(params);
      console.log(httpParams);
      return this.httpService.get(this._GAMES_URL, {params: httpParams}) as Observable<Game[]>;
    }
    return this.httpService.get(this._GAMES_URL) as Observable<Game[]>;
  }

  addGameToLibrary$(gameId: string): Observable<Game[]> {
    return this.userGamesService.addGameToLibrary$(gameId)
      .pipe(
        concatMap(() => this.getAllGames$()),
        tap(games => {
          this._gamesSubject$.next(games);
        })
      );
  }
}
