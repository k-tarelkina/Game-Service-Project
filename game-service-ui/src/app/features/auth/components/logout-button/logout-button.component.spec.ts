import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutButtonComponent} from './logout-button.component';
import {AuthService} from '../../../../core/services/auth-service/auth.service';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  const authSpy = jasmine.createSpyObj('AuthService', ['logout']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutButtonComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authSpy,
        },
      ],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call log out method from AuthService on click', () => {
    const button = fixture.nativeElement.querySelector('#logout-button');
    button.click();
    expect(authSpy.logout).toHaveBeenCalled();
  });
});
