import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$
        .pipe(
            map((user) => {
              const path = route.routeConfig?.path;
              if (path === 'auth') { // allow if not logged in yet
                if (!user) {
                  return true;
                }
                this.router.navigate(['']);
                return false;
              }
              if (!!user) {
                return true;
              }
              this.router.navigate(['/auth/login']);
              return false;
            }),
        );
  }
}
