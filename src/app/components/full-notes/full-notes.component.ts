import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full-notes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  templateUrl: './full-notes.component.html',
  styleUrl: './full-notes.component.scss',
})
export class FullNotesComponent {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['notes-full/create']);
  }

  // view() {
  //   this.router.navigate(['notes-full/1']);
  // }
}
