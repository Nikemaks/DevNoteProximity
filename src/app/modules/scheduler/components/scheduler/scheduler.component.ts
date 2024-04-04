import {
  Component,
  Inject,
  LOCALE_ID,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';

import { endOfDay, addMonths } from 'date-fns';
import {
  SchedulerViewDay,
  SchedulerViewHour,
  SchedulerViewHourSegment,
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
  startOfPeriod,
  endOfPeriod,
  addPeriod,
  subPeriod,
  SchedulerDateFormatter,
  SchedulerEventTimesChangedEvent,
  CalendarSchedulerViewComponent,
} from 'angular-calendar-scheduler';
import {
  CalendarView,
  CalendarDateFormatter,
  DateAdapter,
} from 'angular-calendar';

import { CalendarService } from '../../services/calendar.service';
import { SegmentActionEvent } from '../../interfaces';

export type hourSegmentsType = 1 | 2 | 4 | 6;

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: SchedulerDateFormatter,
    },
  ],
})
export class SchedulerComponent {
  CalendarView = CalendarView;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewDays: number = 3;
  refresh: Subject<string> = new Subject();
  locale: string = 'en';
  hourSegments: hourSegmentsType = 4;
  weekStartsOn: number = 1;
  startsWithToday: boolean = true;
  activeDayIsOpen: boolean = true;
  excludeDays: number[] = []; // [0];
  dayStartHour: number = 6;
  dayEndHour: number = 22;

  minDate: Date = new Date();
  maxDate: Date = endOfDay(addMonths(new Date(), 1));
  dayModifier!: () => void;
  hourModifier!: () => void;
  segmentModifier;
  eventModifier;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  actions: CalendarSchedulerEventAction[] = [
    {
      when: 'enabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
      title: 'Delete',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Delete' on event " + event.id);
      },
    },
    {
      when: 'cancelled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
      title: 'Restore',
      onClick: (event: CalendarSchedulerEvent): void => {
        console.log("Pressed action 'Restore' on event " + event.id);
      },
    },
  ];

  events!: CalendarSchedulerEvent[];

  @Input() set calendarEvents(events: CalendarSchedulerEvent[]) {
    this.events = events;
  }

  @Output() segmentClickedEmit = new EventEmitter<SegmentActionEvent>();

  @ViewChild(CalendarSchedulerViewComponent)
  calendarScheduler!: CalendarSchedulerViewComponent;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private appService: CalendarService,
    private dateAdapter: DateAdapter
  ) {
    this.locale = locale;

    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
      segment.isDisabled = !this.isDateValid(segment.date);
    }).bind(this);

    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
      event.isDisabled = !this.isDateValid(event.start);
    }).bind(this);

    this.dateOrViewChanged();
  }

  viewDaysOptionChanged(viewDays: string | number): void {
    console.log('viewDaysOptionChanged', +viewDays);
    this.calendarScheduler.setViewDays(+viewDays);
  }

  changeDate(date: Date): void {
    console.log('changeDate', date);
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarView): void {
    console.log('changeView', view);
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    const dayOffset = this.startsWithToday ? 1 : -1;
    const prevDate = subPeriod(
      this.dateAdapter,
      CalendarView.Day,
      this.viewDate,
      dayOffset
    );
    const nextDate = addPeriod(
      this.dateAdapter,
      CalendarView.Day,
      this.viewDate,
      dayOffset
    );

    this.prevBtnDisabled = !this.isDateValid(
      this.startsWithToday
        ? prevDate
        : endOfPeriod(this.dateAdapter, CalendarView.Day, prevDate)
    );
    this.nextBtnDisabled = !this.isDateValid(
      this.startsWithToday
        ? nextDate
        : startOfPeriod(this.dateAdapter, CalendarView.Day, nextDate)
    );

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  private isDateValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  viewDaysChanged(viewDays: number): void {
    console.log('viewDaysChanged', viewDays);
    this.viewDays = viewDays;
  }

  dayHeaderClicked(day: SchedulerViewDay): void {
    console.log('dayHeaderClicked Day', day);
  }

  hourClicked(hour: SchedulerViewHour): void {
    console.log('hourClicked Hour', hour);
  }

  segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    this.segmentClickedEmit.emit({
      action,
      segment,
    });
  }

  eventClicked(action: string, event: CalendarSchedulerEvent): void {
    console.log('eventClicked Action', action);
    console.log('eventClicked Event', event);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
    type,
  }: SchedulerEventTimesChangedEvent): void {
    console.log('eventTimesChanged Type', type);
    console.log('eventTimesChanged Event', event);
    console.log('eventTimesChanged New Times', newStart, newEnd);
    const ev: CalendarSchedulerEvent =
      this.events.find(e => e.id === event.id) ||
      ({} as CalendarSchedulerEvent);
    ev.start = newStart;
    ev.end = newEnd;
    this.refresh.next('');
  }
}
