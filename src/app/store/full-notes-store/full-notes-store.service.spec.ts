import { TestBed } from '@angular/core/testing';

import { FullNotesStoreService } from './full-notes-store.service';

describe('FullNotesStoreService', () => {
  let service: FullNotesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullNotesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
