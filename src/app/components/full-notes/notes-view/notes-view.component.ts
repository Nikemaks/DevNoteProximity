import { Component } from '@angular/core';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-view.component.html',
  styleUrl: './notes-view.component.scss',
})
export class NotesViewComponent {
  constructor(private store: FullNotesStoreService) {}

  note$ = this.store.selectModelForView$;
}
