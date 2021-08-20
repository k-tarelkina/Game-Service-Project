import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import {GamesService} from "../../../../core/services/games-service/games.service";

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let gamesServiceSpy:  jasmine.SpyObj<GamesService>;
  let gamesSpy = jasmine.createSpyObj('GamesService', [''])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
