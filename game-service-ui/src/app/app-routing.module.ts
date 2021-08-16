import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
