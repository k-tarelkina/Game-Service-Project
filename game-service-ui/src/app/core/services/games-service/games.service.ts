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
  private _options!: Object;

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

  get games$(): Observable<Game[]> {
    return this._gamesSubject$.asObservable();
  }

  applyOptions$(options: GamesOptions): Observable<Game[]> {
    this._options = options
    return this.getAllGames$()
      .pipe(
        tap(games => {
          this._gamesSubject$.next(games);
        }));
  }

  getAllGames$(): Observable<Game[]> {
    if (this._options) {
      const httpParams = this.httpService.formHttpParams(this._options);
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
