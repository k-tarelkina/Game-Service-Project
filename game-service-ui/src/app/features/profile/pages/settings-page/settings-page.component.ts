import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth-service/auth.service';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../../../core/models/user.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  user$!: Observable<UserModel>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  submitSettings(newUserData: Partial<UserModel>): void {
    const sub = this.authService.updateUser(newUserData)
        .subscribe(() => alert('Your info was successfully updated'));
    this._subscriptions.add(sub);
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
