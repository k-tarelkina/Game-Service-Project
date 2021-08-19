import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../../core/models/game.model";
import {GamesService} from "../../../../core/services/games-service/games.service";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game;
  picturePlaceholder = '/assets/image-placeholder-icon.png';
  addedToLibrary = this.game?.addedToCurrentUser || false;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
  }

  addToLibrary() {
    this.gamesService.addGameToLibrary$(this.game._id).subscribe();
  }

}
