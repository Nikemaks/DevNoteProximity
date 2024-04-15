import { TestBed } from '@angular/core/testing';

import { FullNotesService } from './full-notes.service';

describe('FullNotesService', () => {
  let service: FullNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullNotesService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
