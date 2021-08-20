import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFiltersContainerComponent } from './games-filters-container.component';

describe('GamesFiltersContainerComponent', () => {
  let component: GamesFiltersContainerComponent;
  let fixture: ComponentFixture<GamesFiltersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesFiltersContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesFiltersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
