import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EDITOR_CONFIG } from './config';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { FullNoteItem } from '../../../interfaces/full-notes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notes-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './notes-create.component.html',
  styleUrl: './notes-create.component.scss',
})
export class NotesCreateComponent {
  editorConfig = EDITOR_CONFIG;
  formGroup = this._fb.group({
    htmlContent: ['', Validators.required],
    title: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private store: FullNotesStoreService,
    private _snackBar: MatSnackBar
  ) {}

  saveNotes() {
    if (this.formGroup.invalid) return;
    this.store.saveNote$(this.formGroup.value as FullNoteItem);
    this._snackBar.open('Note added!', 'Close', {
      duration: 2500,
    });
    this.router.navigate(['notes-full']);
  }

  cancel() {
    this.formGroup.reset();
    this.router.navigate(['notes-full']);
  }
}
