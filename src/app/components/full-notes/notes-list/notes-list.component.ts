import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  notes$ = this.store.selectAllNotes$;

  constructor(
    private store: FullNotesStoreService,
    private router: Router
  ) {
    this.store.getAllNotes$();
  }

  viewItem(id: string) {
    this.store.setViewIdNotes(id);
    this.router.navigate([`notes-full/${id}`]);
  }
}
