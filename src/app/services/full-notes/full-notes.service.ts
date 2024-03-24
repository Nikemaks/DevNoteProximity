import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import {
  FullNoteItem,
  FullNotesSettings,
  Note,
  Notes,
} from '../../interfaces/full-notes';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullNotesService {
  storageKey = 'FULL_NOTES';
  storageKeySettings = 'FULL_NOTES_SWITCH_TYPE';

  constructor(private localStorage: StorageService) {}

  fetchAllTestAccounts() {
    return this.localStorage.getStorageItem<FullNoteItem[]>(this.storageKey);
  }

  fetchFullNotesDisplayType() {
    return this.localStorage.getStorageItem<FullNotesSettings>(
      this.storageKeySettings
    );
  }

  saveNote(note: FullNoteItem): Observable<FullNoteItem[]> {
    return this.fetchAllTestAccounts().pipe(
      switchMap((notes: FullNoteItem[]) => {
        note.id = this.generateId();
        const newArray = [note, ...notes];
        this.localStorage.setStorage<FullNoteItem[]>(this.storageKey, newArray);
        return of([note]);
      })
    );
  }

  removeNote(id: string): Observable<string> {
    return this.fetchAllTestAccounts().pipe(
      switchMap((notes: FullNoteItem[]) => {
        const newArray = notes.filter(itm => itm.id !== id);
        this.localStorage.setStorage<FullNoteItem[]>(this.storageKey, newArray);
        return of(id);
      })
    );
  }

  updateNotes(notesId: string, notes: Note[]) {
    return this.fetchAllTestAccounts().pipe(
      switchMap((note: Notes[]) => {
        const currentNote = note.find(itm => itm.id === notesId);
        const updateNote = Object.assign({}, currentNote, { notes });
        const newArr = [updateNote, ...note];

        this.localStorage.setStorage<Notes[]>(
          this.storageKey,
          this.filterUniqueById(newArr)
        );
        return of({ notesId, notes });
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

  filterUniqueById(arr: Notes[]) {
    const seenIds = new Set();
    return arr.filter((obj: Notes) => {
      if (!seenIds.has(obj.id)) {
        seenIds.add(obj.id);
        return true;
      }
      return false;
    });
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
