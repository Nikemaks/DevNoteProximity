import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {}
