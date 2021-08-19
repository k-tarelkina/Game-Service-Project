import { Injectable } from '@angular/core';
import {HttpService} from "../http-service/http.service";
import {Game} from "../../models/game.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, concatMap, tap} from "rxjs/operators";
import {UserGamesService} from "../user-games-service/user-games.service";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private GAMES_URL = '/api/games';

  private gamesSubject$ = new BehaviorSubject<Game[]>([]);

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
        this.gamesSubject$.next(games)
      });
  }

  get games$(): Observable<Game[]> {
    return this.gamesSubject$.asObservable();
  }

  getAllGames$(params?: Object): Observable<Game[]> {
    if (params) {
      const httpParams = this.httpService.formHttpParams(params);
      return this.httpService.get(this.GAMES_URL, {params: httpParams}) as Observable<Game[]>;
    }
    return this.httpService.get(this.GAMES_URL) as Observable<Game[]>;
  }

  addGameToLibrary$(gameId: string): Observable<Game[]> {
    return this.userGamesService.addGameToLibrary$(gameId)
      .pipe(
        concatMap(() => this.getAllGames$()),
        tap(games => {
          this.gamesSubject$.next(games);
        })
      );
  }
}
