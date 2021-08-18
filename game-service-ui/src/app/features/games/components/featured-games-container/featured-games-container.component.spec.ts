import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGamesContainerComponent } from './featured-games-container.component';

describe('FeaturedGamesContainerComponent', () => {
  let component: FeaturedGamesContainerComponent;
  let fixture: ComponentFixture<FeaturedGamesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedGamesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedGamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
