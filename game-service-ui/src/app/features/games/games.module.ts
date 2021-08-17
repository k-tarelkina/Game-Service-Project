import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesCataloguePageComponent } from './pages/games-catalogue-page/games-catalogue-page.component';


@NgModule({
  declarations: [
    GamesCataloguePageComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
