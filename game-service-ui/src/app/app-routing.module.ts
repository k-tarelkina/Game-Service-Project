import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth-guard.guard";

/*
routes:
/auth
  /sign_in
  /sign_up
/profile
/games_catalogue
/library
/friends

modules:
auth
profile
users (friends)
games
library
 */

const routes: Routes = [
  {
    path: '',
    loadChildren:  () => import('./features/games/games.module').then(m => m.GamesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
