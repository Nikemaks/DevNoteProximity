import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { EventModel } from '../../models/EventModel';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {
  storageKey = 'CALENDAR_EVENTS';

  constructor(private localStorage: StorageService) {}

  fetchAllEvents() {
    return this.localStorage.getStorageItem<EventModel[]>(this.storageKey);
  }

  saveCalendarEvent(event: EventModel): Observable<EventModel[]> {
    return this.fetchAllEvents().pipe(
      switchMap((events: EventModel[]) => {
        const newArray = [event, ...events];
        this.localStorage.setStorage<EventModel[]>(this.storageKey, newArray);
        return of([event]);
      })
    );
  }
}
