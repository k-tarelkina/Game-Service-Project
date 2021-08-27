import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeaturedGamesContainerComponent} from './featured-games-container.component';
import {GamesService} from '../../../../core/services/games-service/games.service';

describe('FeaturedGamesContainerComponent', () => {
  let component: FeaturedGamesContainerComponent;
  let fixture: ComponentFixture<FeaturedGamesContainerComponent>;
  const gamesSpy = jasmine.createSpyObj('GamesService', [], ['games$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedGamesContainerComponent],
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
    fixture = TestBed.createComponent(FeaturedGamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
