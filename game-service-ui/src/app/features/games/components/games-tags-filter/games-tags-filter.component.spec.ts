import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTagsFilterComponent } from './games-tags-filter.component';

describe('GamesTagsFilterComponent', () => {
  let component: GamesTagsFilterComponent;
  let fixture: ComponentFixture<GamesTagsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesTagsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTagsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
