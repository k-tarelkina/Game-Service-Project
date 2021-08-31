import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SignInFormComponent} from './sign-in-form.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth-service/auth.service';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  const authSpy = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: authSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const el = fixture.nativeElement;
    emailInput = el.querySelector('#sign-in-email');
    passwordInput = el.querySelector('#sign-in-password');
    submitButton = el.querySelector('#sign-in-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty initial values', () => {
    const initValues = {
      email: '',
      password: '',
    };
    expect(component.loginGroup.value).toEqual(initValues);
  });

  it('should correctly bind email form control to the form input',
      waitForAsync(async () => {
        const email = 'email@email.com';
        emailInput.value = email;
        emailInput.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.loginGroup.value.email).toEqual(email);
      }));

  it('should correctly bind password form control to the form input',
      waitForAsync(async () => {
        const password = 'password';
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.loginGroup.value.password).toEqual(password);
      }));

  it('should call login method of AuthService on submit',
      waitForAsync(async () => {
        const email = 'email@email.com';
        emailInput.value = email;
        emailInput.dispatchEvent(new Event('input'));

        const password = 'password';
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event('input'));

        await fixture.whenStable();
        fixture.detectChanges();

        submitButton.click();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(authSpy.login).toHaveBeenCalledWith(email, password);
      }));

  it('should disable submit button if email input is incorrect',
      waitForAsync(async () => {
        emailInput.value = 'incorrectEmail';
        emailInput.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(submitButton.disabled).toBeTrue();
      }));

  it('should disable submit button if email input is empty',
      waitForAsync(async () => {
        emailInput.value = '';
        emailInput.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(submitButton.disabled).toBeTrue();
      }));

  it('should disable submit button if password input is empty',
      waitForAsync(async () => {
        passwordInput.value = '';
        passwordInput.dispatchEvent(new Event('input'));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(submitButton.disabled).toBeTrue();
      }));

  it('should set errorMessage to null if all of the inputs are correct',
      waitForAsync(async () => {
        emailInput.value = 'email@email.com';
        emailInput.dispatchEvent(new Event('input'));

        passwordInput.value = 'password';
        passwordInput.dispatchEvent(new Event('input'));

        await fixture.whenStable();
        fixture.detectChanges();

        expect(submitButton.disabled).toBeFalse();
      }));
});
