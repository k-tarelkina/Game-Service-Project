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
export class GameCardComponent implements OnDestroy {
  private subscription = new Subscription();

  @Input() game!: GameModel;
  picturePlaceholder = '/assets/image-placeholder-icon.png';
  addedToLibrary = this.game?.addedToCurrentUser || false;

  constructor(private gamesService: GamesService) { }

  private getShortDescription() {
    return this.game.description.split('. ')[0];
  }

  private formShareText(): string {
    return `${this.game.name}: ${this.getShortDescription()}... Discover more exciting games at ${environment.apiUrl}`;
  }

  addToLibrary() {
    const sub = this.gamesService.addGameToLibrary$(this.game._id).subscribe();
    this.subscription.add(sub);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.formShareText())
      .then(() => alert('GameModel info was copied! Now you can share it in social media'))
  }

  download() {
    alert('Download has started');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
