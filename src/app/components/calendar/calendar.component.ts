import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerCalendarModule } from '../../modules/scheduler/scheduler-module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatDialog } from '@angular/material/dialog';
import { EventModel } from '../../models/EventModel';
import { CalendarEventsStore } from '../../store/calendar-events/calendar-events-store.service';
import { CalendarSchedulerEvent } from 'angular-calendar-scheduler';
import { FormValue } from '../../interfaces/event-model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    SchedulerCalendarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  calendarEvents: CalendarSchedulerEvent[] = [];

  constructor(
    public dialog: MatDialog,
    private store: CalendarEventsStore
  ) {
    this.store.getAllEvents$();
    this.store.selectAllEvents$.subscribe((value: EventModel[]) => {
      this.calendarEvents = value as CalendarSchedulerEvent[];
    });
  }

  addEvent() {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      height: '500px',
      width: '720px',
    });
    dialogRef.afterClosed().subscribe((value: FormValue) => {
      this.store.saveEvent$(new EventModel(value));
    });
  }
}
