import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FullNoteItem, FullNotesSettings } from '../../interfaces/full-notes';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FireBaseDbService } from '../firebase/firebase-db.service';

@Injectable({
  providedIn: 'root',
})
export class FullNotesService {
  storageKey = 'FULL_NOTES';
  storageKeySettings = 'FULL_NOTES_SWITCH_TYPE';

  constructor(
    private localStorage: StorageService,
    private _fbDb: FireBaseDbService
  ) {}

  fetchAllFullNotes() {
    return this._fbDb.getCollection<FullNoteItem>(this.storageKey);
  }

  fetchFullNotesDisplayType() {
    return this.localStorage.getStorageItem<FullNotesSettings>(
      this.storageKeySettings
    );
  }

  saveNote(note: FullNoteItem): Observable<FullNoteItem[]> {
    return this._fbDb.saveCollection(note, this.storageKey).pipe(
      switchMap(({ id }) => {
        note.id = id;
        return of([note]);
      })
    );
  }

  updateNote(updateNote: FullNoteItem): Observable<FullNoteItem[]> {
    return this._fbDb.updateCollection(updateNote, this.storageKey).pipe(
      switchMap(() => {
        return of([updateNote]);
      })
    );
  }

  removeNote(id: string): Observable<string> {
    return this._fbDb.deleteCollection(id, this.storageKey).pipe(
      switchMap(() => {
        return of(id);
      })
    );
  }

  saveToggleDisplayType(): Observable<FullNotesSettings> {
    return this.fetchFullNotesDisplayType().pipe(
      switchMap(
        ({ isDisplayType, ...fullNotesSettings }: FullNotesSettings) => {
          const newSettings: FullNotesSettings = {
            ...fullNotesSettings,
            isDisplayType: !isDisplayType,
          };
          this.localStorage.setStorage<FullNotesSettings>(
            this.storageKeySettings,
            newSettings
          );
          return of(newSettings);
        }
      )
    );
  }
}
