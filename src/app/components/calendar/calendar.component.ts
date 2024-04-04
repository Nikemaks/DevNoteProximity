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
import { SegmentActionEvent } from '../../modules/scheduler/interfaces';

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
    this.openCreateEventDialog();
  }

  onSegmentClicked({ segment }: SegmentActionEvent) {
    this.openCreateEventDialog({ date: segment.date });
  }

  openCreateEventDialog(data?: { date: Date }) {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      height: '500px',
      width: '720px',
      data,
    });
    dialogRef.afterClosed().subscribe((value: FormValue) => {
      if (!value) return;
      this.store.saveEvent$(new EventModel(value));
    });
  }
}
