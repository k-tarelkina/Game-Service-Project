import { TestBed } from '@angular/core/testing';

import { GamesTagsService } from './games-tags.service';

describe('GamesTagsService', () => {
  let service: GamesTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
