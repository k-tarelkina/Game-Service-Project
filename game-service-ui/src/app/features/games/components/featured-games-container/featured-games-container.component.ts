import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Game} from "../../../../core/models/game.model";
import {GamesService} from "../../../../core/services/games-service/games.service";

@Component({
  selector: 'app-featured-games-container',
  templateUrl: './featured-games-container.component.html',
  styleUrls: ['./featured-games-container.component.scss']
})
export class FeaturedGamesContainerComponent implements OnInit {
  games$!: Observable<Game[]>;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.games$;
  }
}
