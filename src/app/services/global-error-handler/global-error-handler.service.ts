import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) {}

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  handleError(error: any) {
    this.zone.run(() =>
      this.errorDialogService.openDialog(
        error?.message || 'Undefined client error',
        error?.status
      )
    );

    console.error('Error from global error handler', error);
  }
}
