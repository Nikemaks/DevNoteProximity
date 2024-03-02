import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  notes$ = this.store.selectAllNotes$;

  constructor(private store: FullNotesStoreService) {
    this.store.getAllNotes$();
  }
}
