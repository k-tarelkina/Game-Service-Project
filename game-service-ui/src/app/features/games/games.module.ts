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
import {ReactiveFormsModule} from "@angular/forms";
import { GamesPriceFilterComponent } from './components/games-price-filter/games-price-filter.component';
import { GamesTagsFilterComponent } from './components/games-tags-filter/games-tags-filter.component';
import { GamesFiltersContainerComponent } from './components/games-filters-container/games-filters-container.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    GamesCataloguePageComponent,
    GamesLibraryPageComponent,
    GameCardComponent,
    GamesContainerComponent,
    FeaturedGamesContainerComponent,
    UserGamesContainerComponent,
    GamesPriceFilterComponent,
    GamesTagsFilterComponent,
    GamesFiltersContainerComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSliderModule
  ]
})
export class GamesModule { }
