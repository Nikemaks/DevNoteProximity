import { Component } from '@angular/core';
import { BoardListComponent } from './kanban/board-list/board-list.component';

@Component({
  selector: 'app-short-notes',
  standalone: true,
  imports: [BoardListComponent],
  templateUrl: './short-notes.component.html',
  styleUrl: './short-notes.component.scss',
})
export class ShortNotesComponent {}
