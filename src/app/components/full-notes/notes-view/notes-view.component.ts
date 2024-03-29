import { Component, Input } from '@angular/core';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNotesService } from '../../../services/full-notes/full-notes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';
import { Router } from '@angular/router';
import { FullNoteItem } from '../../../interfaces/full-notes';

@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './notes-view.component.html',
  styleUrl: './notes-view.component.scss',
})
export class NotesViewComponent {
  @Input() note!: FullNoteItem[];
  isContentEditable: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private store: FullNotesStoreService,
    private fullNotesService: FullNotesService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  note$ = this.store.selectModelForView$;

  toggleContentEditable() {
    this.isContentEditable = !this.isContentEditable;
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;

    /*this.store.editNote$({
      id: id || '',
      notes: notes || [],
    });*/
  }

  cancelChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;
  }

  deleteNote(removeId: string | null) {
    const dialogRef = this.dialog.open(ConfirmActionComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.removeNote$(removeId || '');
        this.router.navigate(['notes-full']);
      }
    });
  }
}
