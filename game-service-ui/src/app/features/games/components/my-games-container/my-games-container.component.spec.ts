import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesContainerComponent } from './my-games-container.component';
import {MyGamesService} from "../../../../core/services/my-games-service/my-games.service";

describe('MyGamesContainerComponent', () => {
  let component: MyGamesContainerComponent;
  let fixture: ComponentFixture<MyGamesContainerComponent>;
  const myGamesSpy = jasmine.createSpyObj('MyGamesService', [], ['games$'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGamesContainerComponent ],
      providers: [
        {
          provide: MyGamesService,
          useValue: myGamesSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
