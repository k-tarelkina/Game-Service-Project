import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesCataloguePageComponent} from './pages/games-catalogue-page/games-catalogue-page.component';
import {GamesLibraryPageComponent} from './pages/games-library-page/games-library-page.component';

const routes: Routes = [
  {
    path: '',
    component: GamesCataloguePageComponent,
  },
  {
    path: 'library',
    component: GamesLibraryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
