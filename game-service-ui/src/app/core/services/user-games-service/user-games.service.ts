import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Game} from "../../models/game.model";
import {HttpService} from "../http-service/http.service";
import {catchError, concatMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserGamesService {
  private MY_GAMES_URL = '/api/users/me/games';

  private gamesSubject$ = new BehaviorSubject<Game[]>([]);

  constructor(private httpService: HttpService<Game>) {
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

  get games$(): Observable<Game[]> {
    return this.gamesSubject$.asObservable();
  }

  getUserGames$(): Observable<Game[]> {
    return this.httpService.get(this.MY_GAMES_URL) as Observable<Game[]>;
  }

  addGameToLibrary$(gameId: string): Observable<Game[]> {
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
