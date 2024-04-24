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

export const FORMAT_TIME_STR = 'h:mm aa';
