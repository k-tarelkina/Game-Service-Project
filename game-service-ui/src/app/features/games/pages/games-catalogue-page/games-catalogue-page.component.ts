import { Component } from '@angular/core';
import {GamesOptions, GamesService} from "../../../../core/services/games-service/games.service";

@Component({
  selector: 'app-games-catalogue-page',
  templateUrl: './games-catalogue-page.component.html',
  styleUrls: ['./games-catalogue-page.component.scss']
})
export class GamesCataloguePageComponent {
  searchText: string = '';
  filters: GamesOptions = {};

  constructor(private gamesService: GamesService) {
  }

  applyOptionsToGames() {
    this.gamesService.applyOptions$({name: this.searchText, ...this.filters}).subscribe();
  }

  search(text: string): void {
    this.searchText = text;
    this.applyOptionsToGames();
  }

  filter(filters: GamesOptions): void {
    this.filters = filters;
    this.applyOptionsToGames();
  }
}
