import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { EventModel } from '../../models/EventModel';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FireBaseDbService } from '../firebase/firebase-db.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {
  storageKey = 'CALENDAR_EVENTS';

  constructor(
    private localStorage: StorageService,
    private _fbDb: FireBaseDbService
  ) {}

  fetchAllEvents(): Observable<EventModel[]> {
    return this._fbDb.getCollection<EventModel>(this.storageKey);
  }

  saveCalendarEvent(event: EventModel): Observable<EventModel[]> {
    return this._fbDb.saveCollection({ ...event }, this.storageKey).pipe(
      switchMap(({ id }) => {
        event.id = id;
        return of([event]);
      })
    );
  }

  updateCalendarEvents(events: EventModel[]): Observable<EventModel[]> {
    this.localStorage.setStorage<EventModel[]>(this.storageKey, events);
    return of(events);
  }

  removeEvent(removeId: string): Observable<EventModel[]> {
    return this.fetchAllEvents().pipe(
      switchMap((events: EventModel[]) => {
        const newArray = events.filter(({ id }) => id !== removeId);
        return of(newArray);
      }),
      tap(updatedEvents => {
        this.localStorage.setStorage<EventModel[]>(
          this.storageKey,
          updatedEvents
        );
      })
    );
  }

  toggleCancelEvent(cancelId: string): Observable<EventModel[]> {
    return this.fetchAllEvents().pipe(
      switchMap((events: EventModel[]) => {
        const newArray = events.map(event => {
          if (event.id == cancelId) {
            event.isCancelled = !event.isCancelled;
          }
          return event;
        });
        return of(newArray);
      }),
      tap(updatedEvents => {
        this.localStorage.setStorage<EventModel[]>(
          this.storageKey,
          updatedEvents
        );
      })
    );
  }
}
