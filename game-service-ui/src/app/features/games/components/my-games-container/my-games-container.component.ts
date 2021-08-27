import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {GameModel} from '../../../../core/models/game.model';
import {MyGamesService} from '../../../../core/services/my-games-service/my-games.service';

@Component({
  selector: 'app-my-games-container',
  templateUrl: './my-games-container.component.html',
  styleUrls: ['./my-games-container.component.scss'],
})
export class MyGamesContainerComponent implements OnInit {
  games$!: Observable<GameModel[]>;

  constructor(private gamesService: MyGamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.games$;
  }
}
