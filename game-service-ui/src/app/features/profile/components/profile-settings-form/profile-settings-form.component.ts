import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {UserModel} from '../../../../core/models/user.model';

export function createDisableFloatValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const {value} = control;
    if (!value) {
      return null;
    }
    return Number.isInteger(value) ?
      null : {message: 'Number should be an integer'};
  };
}

@Component({
  selector: 'app-profile-settings-form',
  templateUrl: './profile-settings-form.component.html',
  styleUrls: ['./profile-settings-form.component.scss'],
})
export class ProfileSettingsFormComponent implements OnInit {
  @Input() user!: UserModel;
  @Output() newUserData = new EventEmitter<Partial<UserModel>>();
  profileSettingsGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileSettingsGroup = this.fb.group({
      username: this.fb.control(this.user && this.user.username || '',
          [Validators.required]),
      email: this.fb.control(this.user && this.user.email|| '',
          [Validators.required, Validators.email]),
      age: this.fb.control(this.user && this.user.age|| null,
          [Validators.min(1), Validators.max(150),
            createDisableFloatValidator()]),
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
