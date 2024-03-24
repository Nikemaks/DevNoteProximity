export interface FullNoteItem {
  id: string;
  title: string;
  htmlContent: string;
}

export interface UpdateInterface {
  notesId: string;
  notes: Note[];
}

export interface Note {
  id?: string;
  title?: string;
  content?: string;
}

export interface Notes {
  id?: string;
  title?: string;
  notes?: Note[];
}

export interface FullNotesSettings {
  isDisplayType: boolean;
}
