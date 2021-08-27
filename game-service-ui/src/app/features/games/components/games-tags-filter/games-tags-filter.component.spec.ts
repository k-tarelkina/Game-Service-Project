import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GamesTagsFilterComponent} from './games-tags-filter.component';
import {GamesTagsService} from '../../../../core/services/games-tags-service/games-tags.service';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';

describe('GamesTagsFilterComponent', () => {
  let component: GamesTagsFilterComponent;
  let fixture: ComponentFixture<GamesTagsFilterComponent>;
  const gamesTagsSpy = jasmine.createSpyObj(
      'GamesTagsService', ['getAllTags$']);
  gamesTagsSpy.getAllTags$.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesTagsFilterComponent],
      providers: [
        {
          provide: GamesTagsService,
          useValue: gamesTagsSpy,
        },
        FormBuilder,
      ],
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
