import { Component, OnInit } from '@angular/core';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNotesService } from '../../../services/full-notes/full-notes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';
import { Router } from '@angular/router';
import { FullNoteItem } from '../../../interfaces/full-notes';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { EDITOR_CONFIG } from '../notes-create/config';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-notes-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInput,
    AngularEditorModule,
    MatFormField,
  ],
  templateUrl: './notes-view.component.html',
  styleUrl: './notes-view.component.scss',
})
export class NotesViewComponent implements OnInit {
  isContentEditable: boolean = false;
  isEditMode: boolean = false;

  formGroup = this._fb.group({
    htmlContent: ['', Validators.required],
    title: ['', Validators.required],
  });
  private noteViewItem!: FullNoteItem;
  protected readonly editorConfig = EDITOR_CONFIG;

  constructor(
    private store: FullNotesStoreService,
    private fullNotesService: FullNotesService,
    private router: Router,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  note$ = this.store.selectModelForView$;

  ngOnInit() {
    this.store.selectModelForView$.subscribe(noteViewItem => {
      const { title, htmlContent } = noteViewItem;
      // this.formGroup.disable();
      this.formGroup.patchValue({ title, htmlContent });
      this.noteViewItem = noteViewItem;
    });
  }

  toggleContentEditable() {
    this.isContentEditable = !this.isContentEditable;
    this.isEditMode = !this.isEditMode;
    // this.formGroup.enable();
  }

  saveChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;
    console.log(this.noteViewItem);
    const newValueNote = Object.assign(
      {},
      this.noteViewItem,
      this.formGroup.value
    );
    console.log(newValueNote);
    this.store.updateNote$(newValueNote);
  }

  cancelChanges() {
    this.isContentEditable = false;
    this.isEditMode = false;
    // this.formGroup.disable();
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
