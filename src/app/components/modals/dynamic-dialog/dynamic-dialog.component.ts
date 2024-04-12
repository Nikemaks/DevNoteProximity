import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DynamicDialog } from '../../../interfaces/dynamic-dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    TranslateModule,
  ],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
})
export class DynamicDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DynamicDialog) {}
}
