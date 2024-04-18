import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './global-error-handler.service';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandler);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
