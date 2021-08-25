import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ProfileSettingsFormComponent } from './components/profile-settings-form/profile-settings-form.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingsPageComponent,
    ProfileSettingsFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
