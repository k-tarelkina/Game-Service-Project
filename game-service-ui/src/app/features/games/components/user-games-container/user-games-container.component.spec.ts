import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGamesContainerComponent } from './user-games-container.component';

describe('UserGamesContainerComponent', () => {
  let component: UserGamesContainerComponent;
  let fixture: ComponentFixture<UserGamesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGamesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
