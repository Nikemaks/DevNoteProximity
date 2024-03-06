import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Board } from '../board.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'notes.short_notes.board_title' | translate }}</h1>
    <div matDialogContent>
      <p>{{ 'notes.short_notes.board_question' | translate }}</p>
      <mat-form-field>
        <input
          placeholder="{{ 'notes.short_notes.board_placeholder' | translate }}"
          matInput
          [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-button (click)="onNoClick()">
        {{ 'notes.short_notes.cancel_btn' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
        {{ 'notes.short_notes.create_btn' | translate }}
      </button>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    TranslateModule,
  ],
  styles: [],
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Board
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
