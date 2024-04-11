import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.scss',
})
export class GoogleButtonComponent {
  @Input({ required: true }) buttonName: string = 'Sign in with Google';
  @Output() clickBtn = new EventEmitter<Event>();

  onClick(event: Event) {
    this.clickBtn.emit(event);
  }
}
