import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FullNoteItem, FullNotesSettings } from '../../interfaces/full-notes';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullNotesService {
  storageKey = 'FULL_NOTES';
  storageKeySettings = 'FULL_NOTES_SWITCH_TYPE';
  storageKeyEditNote = 'EDIT_NOTE';

  constructor(private localStorage: StorageService) {}

  fetchAllTestAccounts() {
    return this.localStorage.getStorageItem<FullNoteItem[]>(this.storageKey);
  }

  fetchFullNotesDisplayType() {
    return this.localStorage.getStorageItem<FullNotesSettings>(
      this.storageKeySettings
    );
  }

  fetchEditNote() {
    return this.localStorage.getStorageItem<FullNoteItem[]>(
      this.storageKeyEditNote
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

  updateNote(updateNote: FullNoteItem): Observable<FullNoteItem[]> {
    return this.fetchAllTestAccounts().pipe(
      switchMap((notes: FullNoteItem[]) => {
        const updatedNotes = notes.map(note => {
          if (note.id === updateNote.id) {
            return updateNote;
          }
          return note;
        });
        this.localStorage.setStorage<FullNoteItem[]>(
          this.storageKey,
          updatedNotes
        );
        console.log(updatedNotes);
        return of(updatedNotes);
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

  generateId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
