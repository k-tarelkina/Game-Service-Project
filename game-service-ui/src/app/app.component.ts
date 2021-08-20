import { Component } from '@angular/core';
import {AuthService} from "./core/services/auth-service/auth.service";
import {Observable} from "rxjs";
import {User} from "./core/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }
}
