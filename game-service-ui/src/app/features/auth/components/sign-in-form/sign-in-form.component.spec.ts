import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignInFormComponent} from './sign-in-form.component';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth-service/auth.service';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  const authSpy = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInFormComponent],
      providers: [
        FormBuilder,
        {
          provide: AuthService,
          useValue: authSpy,
        },
      ],
    })
        .compileComponents();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
