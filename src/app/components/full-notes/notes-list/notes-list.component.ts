import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent implements OnInit {
  isDisplayType$ = this.store.selectDisplayType$;
  notes$ = this.store.selectAllNotes$;

  constructor(
    private store: FullNotesStoreService,
    private router: Router
  ) {
    this.store.getAllNotes$();
  }

  ngOnInit() {
    this.store.getDisplayType$();
  }

  switcherDisplayType() {
    this.store.saveToggle$();
  }

  viewItem(id: string) {
    this.store.setViewIdNotes(id);
    this.router.navigate([`notes-full/${id}`]);
  }
}
