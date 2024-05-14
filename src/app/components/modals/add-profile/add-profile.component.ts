import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AddUserModalComponent } from '../../test-users/modal/modal.component';

@Component({
  selector: 'add-profile',
  standalone: true,
  imports: [
    CommonModule,
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
    TranslateModule,
  ],
  templateUrl: './add-profile.component.html',
  styleUrl: './add-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProfileComponent {
  hide = true;
  formGroup = this.fb.group({
    value: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
