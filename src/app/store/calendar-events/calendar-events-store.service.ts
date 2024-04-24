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
  readonly selectAllEvents$: Observable<EventModel[]> = this.select(state =>
    state.calendarEvents.map((event: EventModel) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      } as EventModel;
    })
  );

  // updaters
  readonly updateEvents = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents,
    })
  );

  readonly updateEvent = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvent: EventModel) => ({
      ...state,
      calendarEvents: state.calendarEvents.map(itm => {
        if (itm.id === calendarEvent.id) {
          return calendarEvent;
        }
        return itm;
      }),
    })
  );

  readonly addEvent = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvent: EventModel) => ({
      ...state,
      calendarEvents: [...state.calendarEvents, calendarEvent],
    })
  );

  readonly removeEvent = this.updater((state, removeId: string) => ({
    ...state,
    calendarEvents: state.calendarEvents.filter(itm => itm.id !== removeId),
  }));

  readonly setEvents: (
    calendarEvents: EventModel[]
  ) => CalendarEventsStoreInterface = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents,
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

  readonly deleteCalendarEvent$ = this.effect<string>(removeId$ =>
    removeId$.pipe(
      switchMap((removeId: string) =>
        this.calendarEventsService.removeEvent(removeId).pipe(
          tapResponse({
            next: (id: string) => this.removeEvent(id),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly toggleCancelCalendarEvent$ = this.effect<EventModel>(eventModel$ =>
    eventModel$.pipe(
      switchMap((eventModel: EventModel) =>
        this.calendarEventsService.toggleCancelEvent(eventModel).pipe(
          tapResponse({
            next: (event: EventModel) => this.updateEvent(event),
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
