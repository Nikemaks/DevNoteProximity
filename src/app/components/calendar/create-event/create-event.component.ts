import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { format } from 'date-fns';
import { EventStatusItem } from '../../../interfaces/event-model';
import { FORMAT_TIME_STR } from '../../../constants/calendar-events';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    TranslateModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  eventStatusItems: EventStatusItem[] = [
    {
      value: 'ok',
      viewValue: 'Not important',
    },
    {
      value: 'warning',
      viewValue: 'Important',
    },
    {
      value: 'danger',
      viewValue: 'High important',
    },
  ];
  formGroup = this.fb.group({
    title: ['', [Validators.required]],
    day: [this.data?.date || '', [Validators.required]],
    start: [
      this.data ? format(this.data?.date, FORMAT_TIME_STR) : '',
      [Validators.required],
    ],
    end: ['', [Validators.required]],
    content: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
