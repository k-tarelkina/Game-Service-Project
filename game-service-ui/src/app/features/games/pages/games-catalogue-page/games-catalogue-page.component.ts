import {Component, OnDestroy} from '@angular/core';
import {GamesOptions, GamesService} from "../../../../core/services/games-service/games.service";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-games-catalogue-page',
  templateUrl: './games-catalogue-page.component.html',
  styleUrls: ['./games-catalogue-page.component.scss']
})
export class GamesCataloguePageComponent implements OnDestroy {
  private searchText: string = '';
  private filters: GamesOptions = {};
  private subscription = new Subscription();
  isLoading$ = new Subject<boolean>();

  constructor(private gamesService: GamesService) {
  }

  applyOptionsToGames() {
    this.subscription.add(
      this.gamesService
      .applyOptions$({name: this.searchText, ...this.filters})
        .subscribe());
  }

  search(text: string): void {
    this.searchText = text;
    this.applyOptionsToGames();
  }

  filter(filters: GamesOptions): void {
    this.filters = filters;
    this.applyOptionsToGames();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
