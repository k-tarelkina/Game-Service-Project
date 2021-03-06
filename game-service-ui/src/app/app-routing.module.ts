import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth-guard/auth-guard.guard';
import {PageNotFoundComponent} from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadChildren: () => import('./features/games/games.module')
        .then((m) => m.GamesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
        .then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'friends',
    loadChildren: () => import('./features/friends/friends.module')
        .then((m) => m.FriendsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module')
        .then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
