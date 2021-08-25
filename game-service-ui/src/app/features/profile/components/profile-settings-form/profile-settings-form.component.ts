import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserModel} from "../../../../core/models/user.model";

@Component({
  selector: 'app-profile-settings-form',
  templateUrl: './profile-settings-form.component.html',
  styleUrls: ['./profile-settings-form.component.scss']
})
export class ProfileSettingsFormComponent implements OnInit {
  @Input() user!: UserModel;
  profileSettingsGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileSettingsGroup = this.fb.group({
      username: this.fb.control(this.user && this.user.username || ''),
      email: this.fb.control(this.user && this.user.email|| ''),
      age: this.fb.control(this.user && this.user.age|| null)
    });
  }

}
