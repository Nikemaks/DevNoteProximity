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
  isContentEditable: boolean = false;
  isEditMode: boolean = false;

  constructor(private store: FullNotesStoreService) {}

  note$ = this.store.selectModelForView$;

  toggleContentEditable() {
    this.isContentEditable = !this.isContentEditable;
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;
  }

  cancelChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;
  }
}
