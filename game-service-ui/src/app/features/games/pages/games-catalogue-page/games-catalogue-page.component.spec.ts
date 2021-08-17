import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCataloguePageComponent } from './games-catalogue-page.component';

describe('GamesCataloguePageComponent', () => {
  let component: GamesCataloguePageComponent;
  let fixture: ComponentFixture<GamesCataloguePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCataloguePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCataloguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
