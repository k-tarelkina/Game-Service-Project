import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth-service/auth.service";
import {Observable} from "rxjs";
import {UserModel} from "../../../../core/models/user.model";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  user!: UserModel | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  logUser(): void {
    console.log(this.user);
  }

}
