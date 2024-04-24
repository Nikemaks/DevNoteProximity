import {
  CalendarSchedulerEventAction,
  CalendarSchedulerEventStatus,
} from 'angular-calendar-scheduler/modules/scheduler/models/calendar-scheduler-event.model';
import { EventColor } from 'calendar-utils';
import { parse, set } from 'date-fns';
import { FormValue } from '../interfaces/event-model';
import {
  DEFAULT_COLORS,
  DEFAULT_RESIABLE,
  FORMAT_TIME_STR,
} from '../constants/calendar-events';

export class EventModel {
  actions?: CalendarSchedulerEventAction[] | null;
  color: EventColor;
  content: string;
  draggable: boolean;
  end: Date | string;
  id?: string;
  isCancelled: boolean;
  isClickable: boolean;
  isDisabled: boolean;
  resizable: { beforeStart?: boolean; afterEnd?: boolean };
  start: Date | string;
  status: CalendarSchedulerEventStatus;
  title: string;

  constructor(context: FormValue) {
    this.title = context.title ?? '';
    this.status = context.status ?? 'ok';
    this.start = this.addTimeToDate(context.start, context.day) ?? new Date();
    this.end = this.addTimeToDate(context.end, context.day) ?? new Date();
    this.content = context.content ?? '';

    // default params for all
    this.color = DEFAULT_COLORS;
    this.resizable = DEFAULT_RESIABLE;
    this.isDisabled = false;
    this.isClickable = true;
    this.isCancelled = false;
    this.draggable = true;
  }

  addTimeToDate(timeString: string, date: Date) {
    const parsedTime = parse(timeString, FORMAT_TIME_STR, new Date());
    return set(date, {
      hours: parsedTime.getHours(),
      minutes: parsedTime.getMinutes(),
    });
  }
}
