import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../../core/models/game.model";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game;
  picturePlaceholder = '/assets/image-placeholder-icon.png';

  constructor() { }

  ngOnInit(): void {
  }

}
