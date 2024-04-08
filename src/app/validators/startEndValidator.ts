import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { compareAsc, parse } from 'date-fns';
import { FORMAT_TIME_STR } from '../constants/calendar-events';

export const startEndValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const start = control?.get('start')?.value || '';
  const end = control?.get('end')?.value || '';
  const day = control?.get('day')?.value;

  const isTimeInvalid = (() => {
    const parsedStart = parse(start, FORMAT_TIME_STR, day);
    const parsedEnd = parse(end, FORMAT_TIME_STR, day);
    return compareAsc(parsedStart, parsedEnd) !== -1;
  })();

  const error = day && isTimeInvalid ? { endTimeMoreThanStart: true } : null;

  control?.get('start')?.setErrors(error);
  control?.get('end')?.setErrors(error);

  return error;
};
