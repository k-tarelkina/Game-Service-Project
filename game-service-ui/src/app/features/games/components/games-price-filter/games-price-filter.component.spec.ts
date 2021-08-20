import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPriceFilterComponent } from './games-price-filter.component';

describe('GamesPriceFilterComponent', () => {
  let component: GamesPriceFilterComponent;
  let fixture: ComponentFixture<GamesPriceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesPriceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPriceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
