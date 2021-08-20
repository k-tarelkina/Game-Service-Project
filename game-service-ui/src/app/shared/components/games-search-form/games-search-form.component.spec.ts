import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchFormComponent } from './games-search-form.component';

describe('GamesSearchFormComponent', () => {
  let component: GamesSearchFormComponent;
  let fixture: ComponentFixture<GamesSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
