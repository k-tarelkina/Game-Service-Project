import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../core/models/user.model";

@Component({
  selector: 'app-profile-settings-form',
  templateUrl: './profile-settings-form.component.html',
  styleUrls: ['./profile-settings-form.component.scss']
})
export class ProfileSettingsFormComponent implements OnInit {
  @Input() user!: UserModel;
  @Output() newUserData = new EventEmitter<Partial<UserModel>>();
  profileSettingsGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileSettingsGroup = this.fb.group({
      username: this.fb.control(this.user && this.user.username || '', [Validators.required]),
      email: this.fb.control(this.user && this.user.email|| '', [Validators.required]),
      age: this.fb.control(this.user && this.user.age|| null)
    });
  }

  submit() {
    const userData = this.profileSettingsGroup.value;
    this.newUserData.emit(userData);
  }

  reset() {
    this.profileSettingsGroup.reset(this.user);
  }
}
