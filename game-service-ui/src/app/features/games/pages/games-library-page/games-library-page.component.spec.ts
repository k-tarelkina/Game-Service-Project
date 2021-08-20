import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesLibraryPageComponent } from './games-library-page.component';

describe('GamesLibraryPageComponent', () => {
  let component: GamesLibraryPageComponent;
  let fixture: ComponentFixture<GamesLibraryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesLibraryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesLibraryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
