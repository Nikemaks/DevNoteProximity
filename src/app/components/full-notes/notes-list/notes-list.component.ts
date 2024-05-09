import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNotesStoreService } from '../../../store/full-notes-store/full-notes-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, map, Observable } from 'rxjs';
import { NotesData } from '../../../interfaces/notes-data';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';
import { DEBOUNCE_TIME_INPUTS } from '../../../constants/global-constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogComponent } from '../../modals/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent implements OnInit {
  filteredNotes$!: Observable<NotesData>;
  allNotes$!: Observable<NotesData>;
  searchControl = new FormControl('');
  private destroyRef = inject(DestroyRef);

  constructor(
    private store: FullNotesStoreService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.store.getAllNotes$();
  }

  ngOnInit() {
    const isDisplayType$ = this.store.selectDisplayType$;
    this.filteredNotes$ = combineLatest([
      this.store.selectFilteredNotes$,
      isDisplayType$,
    ]).pipe(map(([notes, isDisplayType]) => ({ notes, isDisplayType })));
    this.allNotes$ = combineLatest([
      this.store.selectAllNotes$,
      isDisplayType$,
    ]).pipe(map(([notes, isDisplayType]) => ({ notes, isDisplayType })));
    this.store.getDisplayType$();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME_INPUTS),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => this.store.changeFilters(value || ''));
  }

  switcherDisplayType() {
    this.store.saveToggle$();
  }

  viewItem(id: string) {
    this.store.setViewIdNotes(id);
    this.router.navigate([`notes-full/${id}`]);
  }

  deleteNote(removeId: string | null) {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      data: {
        title: 'dialog-window.title',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.store.removeNote$(removeId || '');
    });
  }
}
