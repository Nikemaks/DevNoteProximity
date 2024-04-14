import { TestBed } from '@angular/core/testing';

import { TestAccountsService } from './test-accounts.service';
import { FireBaseDbService } from '../firebase/firebase-db.service';

describe('TestAccountsService', () => {
  let service: TestAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireBaseDbService],
    });
    service = TestBed.inject(TestAccountsService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
