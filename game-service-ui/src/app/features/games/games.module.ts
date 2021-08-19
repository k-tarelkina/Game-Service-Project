import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesCataloguePageComponent } from './pages/games-catalogue-page/games-catalogue-page.component';
import { GamesLibraryPageComponent } from './pages/games-library-page/games-library-page.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GamesContainerComponent } from './components/games-container/games-container.component';
import { FeaturedGamesContainerComponent } from './components/featured-games-container/featured-games-container.component';
import {SharedModule} from "../../shared/shared.module";
import { UserGamesContainerComponent } from './components/user-games-container/user-games-container.component';


@NgModule({
  declarations: [
    GamesCataloguePageComponent,
    GamesLibraryPageComponent,
    GameCardComponent,
    GamesContainerComponent,
    FeaturedGamesContainerComponent,
    UserGamesContainerComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule
  ]
})
export class GamesModule { }
