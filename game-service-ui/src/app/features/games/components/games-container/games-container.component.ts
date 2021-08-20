import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from "../../../../core/models/game.model";

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss']
})
export class GamesContainerComponent {
  @Input() games!: Game[];
}
