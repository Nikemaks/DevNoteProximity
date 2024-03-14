import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerCalendarModule } from '../../modules/scheduler/scheduler-module';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, SchedulerCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {}
