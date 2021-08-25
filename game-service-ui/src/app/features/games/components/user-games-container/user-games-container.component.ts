import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {GameModel} from "../../../../core/models/game.model";
import {UserGamesService} from "../../../../core/services/user-games-service/user-games.service";

@Component({
  selector: 'app-user-games-container',
  templateUrl: './user-games-container.component.html',
  styleUrls: ['./user-games-container.component.scss']
})
export class UserGamesContainerComponent implements OnInit {
  games$!: Observable<GameModel[]>;

  constructor(private gamesService: UserGamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.games$;
  }
}
