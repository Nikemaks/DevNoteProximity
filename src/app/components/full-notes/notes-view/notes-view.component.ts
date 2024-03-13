import { Component } from '@angular/core';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './notes-view.component.html',
  styleUrl: './notes-view.component.scss',
})
export class NotesViewComponent {
  constructor(private store: FullNotesStoreService) {}

  note$ = this.store.selectModelForView$;
}
