import { TestBed } from '@angular/core/testing';
import { TestAccountsServiceStore } from './test-accounts-store.service';

describe('TestAccountsService', () => {
  let service: TestAccountsServiceStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAccountsServiceStore);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
