import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../../../core/models/game.model";

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss']
})
export class GamesContainerComponent implements OnInit {
  @Input() games!: Game[];

  constructor() { }

  ngOnInit(): void {
  }

}
