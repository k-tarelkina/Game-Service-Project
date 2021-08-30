import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SignInFormComponent} from './sign-in-form.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth-service/auth.service';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values empty', () => {
    const initValues = {
      email: '',
      password: '',
    };
    expect(component.loginGroup.value).toEqual(initValues);
  });

  it('should correctly bind email form control to the form input', () => {
    const email = 'email@email.com';
    const emailInput: HTMLInputElement = fixture.nativeElement
        .querySelector('#sign-in-email');
    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.loginGroup.value.email).toEqual(email);
  });
});
