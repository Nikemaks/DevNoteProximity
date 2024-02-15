import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'add-user-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class AddUserModalComponent {
  hide = true;
  formGroup = this.fb.group({
    group: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    addComment: ['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogRef: MatDialogRef<AddUserModalComponent>,
              private fb: FormBuilder) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
