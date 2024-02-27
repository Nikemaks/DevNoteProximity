import { TestBed } from '@angular/core/testing';

import { BoardStoreService } from './board-store.service';

describe('BoardStoreService', () => {
  let service: BoardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
