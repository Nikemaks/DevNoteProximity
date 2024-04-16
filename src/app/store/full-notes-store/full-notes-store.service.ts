import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FullNoteItem, FullNotesSettings } from '../../interfaces/full-notes';
import { Observable, of } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FullNotesService } from '../../services/full-notes/full-notes.service';

export interface FullNotesStore {
  notes: FullNoteItem[];
  viewNoteId: string;
  isDisplayType: boolean;
  filters: string;
}

@Injectable({
  providedIn: 'root',
})
export class FullNotesStoreService extends ComponentStore<FullNotesStore> {
  constructor(private fullNotesService: FullNotesService) {
    super({ notes: [], viewNoteId: '', isDisplayType: true, filters: '' });
  }

  // select
  readonly selectAllNotes$: Observable<FullNoteItem[]> = this.select(
    state => state.notes
  );

  readonly selectFilteredNotes$: Observable<FullNoteItem[]> = this.select(
    state =>
      state.notes.filter(item => {
        return item.title.includes(state.filters);
      })
  );

  readonly selectViewNoteId$: Observable<string> = this.select(
    state => state.viewNoteId
  );

  readonly selectDisplayType$: Observable<boolean> = this.select(
    state => state.isDisplayType
  );

  readonly selectModelForView$: Observable<FullNoteItem> = this.select(
    this.selectAllNotes$,
    this.selectViewNoteId$,
    (notes, id) => notes.find(el => el.id === id) || ({} as FullNoteItem)
  );

  // updaters
  readonly addNotes = this.updater((state, notes: FullNoteItem[]) => ({
    ...state,
    notes: [...state.notes, ...notes],
  }));

  readonly setNotes = this.updater((state, notes: FullNoteItem[]) => ({
    ...state,
    notes,
  }));

  readonly setViewIdNotes = this.updater((state, viewNoteId: string) => ({
    ...state,
    viewNoteId,
  }));

  readonly removeNote = this.updater((state, removeId: string) => ({
    ...state,
    notes: [...state.notes.filter(itm => itm.id !== removeId)],
  }));

  readonly updateDisplayType = this.updater(
    (state, { isDisplayType }: FullNotesSettings) => ({
      ...state,
      isDisplayType,
    })
  );

  readonly updateNote = this.updater((state, notes: FullNoteItem[]) => ({
    ...state,
    notes: [...notes],
  }));

  readonly changeFilters = this.updater((state, filters: string) => ({
    ...state,
    filters: filters,
  }));

  // effects
  readonly getAllNotes$ = this.effect<void>(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.fullNotesService.fetchAllTestAccounts().pipe(
          tapResponse({
            next: (notes: FullNoteItem[]) => this.setNotes(notes),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );

  readonly saveNote$ = this.effect((note$: Observable<FullNoteItem>) => {
    return note$.pipe(
      switchMap(note =>
        this.fullNotesService.saveNote(note).pipe(
          tapResponse(
            notes => this.addNotes(notes),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly updateNote$ = this.effect((note$: Observable<FullNoteItem>) => {
    return note$.pipe(
      switchMap(note =>
        this.fullNotesService.updateNote(note).pipe(
          tapResponse(
            notes => this.updateNote(notes),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly saveToggle$ = this.effect(trigger$ => {
    return trigger$.pipe(
      switchMap(() =>
        this.fullNotesService.saveToggleDisplayType().pipe(
          switchMap((fullNotesSettings: FullNotesSettings) => {
            this.updateDisplayType(fullNotesSettings);
            return of(fullNotesSettings);
          })
        )
      )
    );
  });

  readonly removeNote$ = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap(id =>
        this.fullNotesService.removeNote(id).pipe(
          tapResponse(
            id => this.removeNote(id),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    );
  });

  readonly getDisplayType$ = this.effect(trigger$ =>
    trigger$.pipe(
      exhaustMap(() =>
        this.fullNotesService.fetchFullNotesDisplayType().pipe(
          tapResponse({
            next: displayType => this.updateDisplayType(displayType),
            error: (error: HttpErrorResponse) => console.error(error),
          })
        )
      )
    )
  );
}
