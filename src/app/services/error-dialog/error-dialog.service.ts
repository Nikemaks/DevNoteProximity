import { DestroyRef, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/modals/error-dialog/error-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  private opened = false;
  private destroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog) {}

  openDialog(message: string, status?: number): void {
    if (this.opened) return;
    this.opened = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message, status },
      maxHeight: '100%',
      width: '540px',
      maxWidth: '100%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.opened = false;
      });
  }
}
