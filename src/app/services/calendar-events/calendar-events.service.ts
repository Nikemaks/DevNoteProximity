import { Injectable } from '@angular/core';
import { EventModel } from '../../models/EventModel';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { FireBaseDbService } from '../firebase/firebase-db.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {
  storageKey = 'CALENDAR_EVENTS';

  constructor(private _fbDb: FireBaseDbService) {}

  fetchAllEvents(): Observable<EventModel[]> {
    return this._fbDb.getCollection<EventModel>(this.storageKey);
  }

  saveCalendarEvent(event: EventModel): Observable<EventModel> {
    return this._fbDb.saveCollection({ ...event }, this.storageKey).pipe(
      switchMap(({ id }) => {
        event.id = id;
        return of(event);
      })
    );
  }

  updateCalendarEvents(events: EventModel[]): Observable<EventModel[]> {
    const updateObservables = events.map(event =>
      this._fbDb
        .updateCollection({ ...event, actions: null }, this.storageKey)
        .pipe(switchMap(() => of(event).pipe(take(1))))
    );

    return combineLatest(updateObservables).pipe(
      switchMap(updatedEvents => {
        return of(updatedEvents);
      })
    );
  }

  removeEvent(removeId: string): Observable<string> {
    return this._fbDb.deleteCollection(removeId, this.storageKey).pipe(
      switchMap(() => {
        return of(removeId);
      })
    );
  }

  toggleCancelEvent(eventModel: EventModel): Observable<EventModel> {
    const updatedEventModel = {
      ...eventModel,
      isCancelled: !eventModel.isCancelled,
      actions: null,
    } as EventModel;
    return this._fbDb.updateCollection(updatedEventModel, this.storageKey).pipe(
      switchMap(() => {
        return of(updatedEventModel);
      })
    );
  }
}
