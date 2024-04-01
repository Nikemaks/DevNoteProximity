import {
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
} from 'angular-calendar-scheduler/modules/scheduler/models/calendar-scheduler-event.model';
import { EventColor } from 'calendar-utils';
import { EventResiable } from '../interfaces/event-model';

export const DEFAULT_COLORS: EventColor = {
  primary: '#E0E0E0',
  secondary: '#EEEEEE',
};

export const DEFAULT_RESIABLE: EventResiable = {
  beforeStart: true,
  afterEnd: true,
};

export const DEFAULT_ACTION: CalendarSchedulerEventAction[] = [
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

export const FORMAT_TIME_STR = 'h:mm aa';
