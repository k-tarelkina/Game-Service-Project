import {Component, Input} from '@angular/core';
import {GameModel} from '../../../../core/models/game.model';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
})
export class GamesContainerComponent {
  @Input() games!: GameModel[];
}
