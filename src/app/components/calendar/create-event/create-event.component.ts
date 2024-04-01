import { Component } from '@angular/core';
import {
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
import { CalendarSchedulerEventStatus } from 'angular-calendar-scheduler/modules/scheduler/models/calendar-scheduler-event.model';

interface EventStatusItem {
  value: CalendarSchedulerEventStatus;
  viewValue: string;
}

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
    day: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    content: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
