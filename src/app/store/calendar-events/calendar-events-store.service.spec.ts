import { TestBed } from '@angular/core/testing';

import { CalendarEventsStore } from './calendar-events-store.service';

describe('CalendarEventsStoreService', () => {
  let service: CalendarEventsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarEventsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
