import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {GameModel} from "../../models/game.model";
import {HttpService} from "../http-service/http.service";
import {catchError, concatMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserGamesService {
  private MY_GAMES_URL = '/api/users/me/games';

  private gamesSubject$ = new BehaviorSubject<GameModel[]>([]);

  constructor(private httpService: HttpService<GameModel>) {
    this.preloadGames();
  }

  private preloadGames() {
    this.getUserGames$()
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

  get games$(): Observable<GameModel[]> {
    return this.gamesSubject$.asObservable();
  }

  getUserGames$(): Observable<GameModel[]> {
    return this.httpService.get(this.MY_GAMES_URL) as Observable<GameModel[]>;
  }

  addGameToLibrary$(gameId: string): Observable<GameModel[]> {
    const url = `${this.MY_GAMES_URL}/${gameId}`;
    return this.httpService.put(url)
      .pipe(
        concatMap(() => this.getUserGames$()),
        tap((games) => {
          console.log('next in user games service')
          console.log(games);
          this.gamesSubject$.next(games)
        })
      );
  }
}
