import {
  CalendarSchedulerEvent,
  CalendarSchedulerEventAction,
} from 'angular-calendar-scheduler/modules/scheduler/models/calendar-scheduler-event.model';
import { EventColor } from 'calendar-utils';
import { EventResiable } from '../interfaces/event-model';
import { Subscription } from 'rxjs';
import { ConfirmActionComponent } from '../components/modals/confirm-action/confirm-action.component';
import { MatDialog } from '@angular/material/dialog';

export const DEFAULT_COLORS: EventColor = {
  primary: '#E0E0E0',
  secondary: '#EEEEEE',
};

export const DEFAULT_RESIABLE: EventResiable = {
  beforeStart: true,
  afterEnd: true,
};

export const createDefaultAction = (
  deleteCallback: (event: CalendarSchedulerEvent) => Subscription,
  toggleCancelCallback: (event: CalendarSchedulerEvent) => Subscription,
  dialog: MatDialog
): CalendarSchedulerEventAction[] => {
  return [
    {
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">delete</i></span>',
      title: 'Delete',
      onClick: (event: CalendarSchedulerEvent): void => {
        dialog
          .open(ConfirmActionComponent)
          .afterClosed()
          .subscribe(result => {
            if (result) {
              deleteCallback(event);
            }
          });
      },
    },
    {
      when: 'enabled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
      title: 'Cancel',
      onClick: (event: CalendarSchedulerEvent): void => {
        toggleCancelCallback(event);
      },
    },
    {
      when: 'cancelled',
      label:
        '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
      title: 'Restore',
      onClick: (event: CalendarSchedulerEvent): void => {
        toggleCancelCallback(event);
      },
    },
  ];
};

export const FORMAT_TIME_STR = 'h:mm aa';
