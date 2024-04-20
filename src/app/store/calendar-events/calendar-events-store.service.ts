import { Injectable } from '@angular/core';
import { EventModel } from '../../models/EventModel';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, Observable } from 'rxjs';
import { CalendarEventsService } from '../../services/calendar-events/calendar-events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { createDefaultAction } from '../../constants/calendar-events';
import { MatDialog } from '@angular/material/dialog';

export interface CalendarEventsStoreInterface {
  calendarEvents: EventModel[];
}

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsStore extends ComponentStore<CalendarEventsStoreInterface> {
  constructor(
    private calendarEventsService: CalendarEventsService,
    private dialog: MatDialog
  ) {
    super({ calendarEvents: [{} as EventModel] });
  }

  // select
  readonly selectAllEvents$: Observable<EventModel[]> = this.select(
    state => state.calendarEvents
  );

  // updaters
  readonly updateEvents = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents,
    })
  );

  readonly setEvents: (
    calendarEvents: EventModel[]
  ) => CalendarEventsStoreInterface = this.updater(
    (state: CalendarEventsStoreInterface, calendarEvents: EventModel[]) => ({
      ...state,
      calendarEvents: calendarEvents.map((event: EventModel) => {
        return Object.assign({}, event, {
          start: new Date(event.start),
          end: new Date(event.end),
          actions: createDefaultAction(
            () => this.deleteCalendarEvent$(event.id || ''),
            () => this.toggleCancelCalendarEvent$(event.id || ''),
            this.dialog
          ),
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

  readonly deleteCalendarEvent$ = this.effect<string>(removeId$ =>
    removeId$.pipe(
      exhaustMap((removeId: string) =>
        this.calendarEventsService.removeEvent(removeId).pipe(
          tapResponse({
            next: (events: EventModel[]) => this.setEvents(events),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly toggleCancelCalendarEvent$ = this.effect<string>(cancelId$ =>
    cancelId$.pipe(
      exhaustMap((cancelId: string) =>
        this.calendarEventsService.toggleCancelEvent(cancelId).pipe(
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
            events => this.setEvents(events),
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
