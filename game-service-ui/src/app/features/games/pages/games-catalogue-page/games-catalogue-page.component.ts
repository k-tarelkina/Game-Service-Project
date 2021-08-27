import {Component, OnDestroy} from '@angular/core';
import {GamesOptions, GamesService} from '../../../../core/services/games-service/games.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-games-catalogue-page',
  templateUrl: './games-catalogue-page.component.html',
  styleUrls: ['./games-catalogue-page.component.scss'],
})
export class GamesCataloguePageComponent implements OnDestroy {
  private _searchText: string = '';
  private _filters: GamesOptions = {};
  private _subscriptions = new Subscription();

  isLoading$ = new Subject<boolean>();

  constructor(private gamesService: GamesService) {}

  applyOptionsToGames() {
    const sub = this.gamesService
        .applyOptions$({name: this._searchText, ...this._filters})
        .subscribe();
    this._subscriptions.add(sub);
  }

  search(text: string): void {
    this._searchText = text;
    this.applyOptionsToGames();
  }

  filter(filters: GamesOptions): void {
    this._filters = filters;
    this.applyOptionsToGames();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
