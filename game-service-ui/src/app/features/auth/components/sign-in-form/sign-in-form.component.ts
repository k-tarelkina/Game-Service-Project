import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../../../core/services/auth-service/auth.service";

interface ErrorObject {
  message: string
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {
  loginGroup = this.fb.group({
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  private handleError(error: ErrorObject) {
    this.errorMessage = error.message;
  }

  onSubmit() {
    const {email, password} = this.loginGroup.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.errorMessage = null;
        },
        error: ({error}) => this.handleError(error)
      });
  }
}
