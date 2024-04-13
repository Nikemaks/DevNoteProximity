import { TestBed } from '@angular/core/testing';

import { FireBaseDbService } from './firebase-db.service';
import { Firestore } from '@angular/fire/firestore';

describe('FirebaseDbService', () => {
  let service: FireBaseDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Firestore],
    });
    service = TestBed.inject(FireBaseDbService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
