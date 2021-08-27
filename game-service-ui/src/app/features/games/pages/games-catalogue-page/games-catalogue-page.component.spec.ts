import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GamesCataloguePageComponent} from './games-catalogue-page.component';
import {GamesService} from '../../../../core/services/games-service/games.service';

describe('GamesCataloguePageComponent', () => {
  let component: GamesCataloguePageComponent;
  let fixture: ComponentFixture<GamesCataloguePageComponent>;
  const gamesSpy = jasmine.createSpyObj('GamesService', ['applyOptions$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesCataloguePageComponent],
      providers: [
        {
          provide: GamesService,
          useValue: gamesSpy,
        },
      ],
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
