import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services/auth-service/auth.service";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
