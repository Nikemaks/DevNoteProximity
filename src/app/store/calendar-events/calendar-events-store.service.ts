import { Injectable } from '@angular/core';
import { EventModel } from '../../models/EventModel';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, Observable } from 'rxjs';
import { CalendarEventsService } from '../../services/calendar-events/calendar-events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

export interface CalendarEventsStoreInterface {
  calendarEvents: EventModel[];
}

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsStore extends ComponentStore<CalendarEventsStoreInterface> {
  constructor(private calendarEventsService: CalendarEventsService) {
    super({ calendarEvents: [{} as EventModel] });
  }

  // select
  readonly selectAllEvents$: Observable<EventModel[]> = this.select(
    state => state.calendarEvents
  );

  // updaters
  readonly addEvent = this.updater(
    (state: CalendarEventsStoreInterface, events: EventModel[]) => ({
      ...state,
      calendarEvents: [...state.calendarEvents, ...events],
    })
  );

  readonly updateEvents = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents,
    })
  );

  readonly setEvents = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents: calendarEvents.map(event => {
        return Object.assign({}, event, {
          start: new Date(event.start),
          end: new Date(event.end),
        });
      }),
    })
  );

  // effects
  readonly getAllEvents$ = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.calendarEventsService.fetchAllEvents().pipe(
          tapResponse({
            next: (events: EventModel[]) => this.setEvents(events),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly saveEvent$ = this.effect((event$: Observable<EventModel>) => {
    return event$.pipe(
      switchMap(event =>
        this.calendarEventsService.saveCalendarEvent(event).pipe(
          tapResponse(
            event => this.addEvent(event),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly updateAllEvents$ = this.effect(
    (events$: Observable<EventModel[]>) => {
      return events$.pipe(
        switchMap(events =>
          this.calendarEventsService.updateCalendarEvents(events).pipe(
            tapResponse(
              event => this.updateEvents(event),
              (error: HttpErrorResponse) => console.log(error)
            )
          )
        )
      );
    }
  );
}
