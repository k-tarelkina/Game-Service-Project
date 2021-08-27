import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsPageComponent} from './settings-page.component';
import {AuthService} from '../../../../core/services/auth-service/auth.service';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  const authSpy = jasmine.createSpyObj('AuthService', ['updateUser'], ['user$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageComponent],
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
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
