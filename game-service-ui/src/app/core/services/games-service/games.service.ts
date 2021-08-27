import {Injectable} from '@angular/core';
import {HttpService} from '../http-service/http.service';
import {GameModel} from '../../models/game.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, concatMap, tap} from 'rxjs/operators';
import {MyGamesService} from '../my-games-service/my-games.service';

export interface GamesOptions {
  name?: string,
  tags?: string[],
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private _GAMES_URL = '/api/games';
  private _gamesSubject$ = new BehaviorSubject<GameModel[]>([]);
  private _options!: Object;

  constructor(private httpService: HttpService<GameModel>,
              private userGamesService: MyGamesService) {
    this.preloadGames();
  }

  private preloadGames() {
    this.getAllGames$()
        .pipe(
            catchError((err) => {
              console.error(err);
              return of([]);
            }),
        )
        .subscribe((games) => {
          this._gamesSubject$.next(games);
        });
  }

  get games$(): Observable<GameModel[]> {
    return this._gamesSubject$.asObservable();
  }

  applyOptions$(options: GamesOptions): Observable<GameModel[]> {
    this._options = options;
    return this.getAllGames$()
        .pipe(
            tap((games) => {
              this._gamesSubject$.next(games);
            }));
  }

  getAllGames$(): Observable<GameModel[]> {
    if (this._options) {
      const httpParams = this.httpService.formHttpParams(this._options);
      return this.httpService.get(this._GAMES_URL, {params: httpParams}) as Observable<GameModel[]>;
    }
    return this.httpService.get(this._GAMES_URL) as Observable<GameModel[]>;
  }

  addGameToLibrary$(gameId: string): Observable<GameModel[]> {
    return this.userGamesService.addGameToLibrary$(gameId)
        .pipe(
            concatMap(() => this.getAllGames$()),
            tap((games) => {
              this._gamesSubject$.next(games);
            }),
        );
  }
}
