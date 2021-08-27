import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GameModel} from "../../../../core/models/game.model";
import {GamesService} from "../../../../core/services/games-service/games.service";
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

  @Input() game!: GameModel;
  picturePlaceholder = '/assets/image-placeholder-icon.png';
  addedToLibrary = this.game?.addedToCurrentUser || false;
  descriptionClass = 'description-minimized';
  descriptionButtonText = 'Show more';
  descriptionText!: string;

  constructor(private gamesService: GamesService) { }

  private getShortDescription() {
    return this.game?.description.split('. ')[0];
  }

  private formShareText(): string {
    return `${this.game.name}: ${this.getShortDescription()}... Discover more at ${environment.apiUrl}`;
  }

  ngOnInit() {
    this.descriptionText = this.getShortDescription();
  }

  addToLibrary() {
    const sub = this.gamesService.addGameToLibrary$(this.game._id).subscribe();
    this._subscriptions.add(sub);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.formShareText())
      .then(() => alert(`${this.game.name} info was copied! Now you can share it in social media`))
  }

  download() {
    alert('Download has started');
  }

  switchDescriptionStyle() {
    const isMinimizedNow = this.descriptionClass === 'description-minimized';
    this.descriptionClass = isMinimizedNow ?
      'description-maximized' : 'description-minimized';
    this.descriptionButtonText = isMinimizedNow ? 'Show less' : 'Show more';
    this.descriptionText = isMinimizedNow ? this.game.description : this.getShortDescription();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
