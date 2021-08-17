import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../../../core/services/auth-service/auth.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  loginGroup = this.fb.group({
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });

  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const {email, password} = this.loginGroup.value;
    this.authService.login(email, password)
      .pipe(
        tap(user => console.log(user)),
        catchError((e) => {
          alert(JSON.stringify(e));
          return of(e);
        })
      )
      .subscribe(val => console.log(val));
    console.log('after login')
  }

}
