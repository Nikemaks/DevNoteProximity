import { CalendarSchedulerEventStatus } from 'angular-calendar-scheduler/modules/scheduler/models/calendar-scheduler-event.model';

export interface FormValue {
  day: Date;
  title: string;
  start: string;
  end: string;
  content: string;
  status: CalendarSchedulerEventStatus;
}

export interface EventResiable {
  beforeStart?: boolean;
  afterEnd?: boolean;
}

export interface EventStatusItem {
  value: CalendarSchedulerEventStatus;
  viewValue: string;
}
