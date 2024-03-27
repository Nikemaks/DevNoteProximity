export interface FullNoteItem {
  id: string;
  title: string;
  htmlContent: string;
}

export interface UpdateInterface {
  id: string;
  notes: FullNoteItem[];
}

export interface FullNotesSettings {
  isDisplayType: boolean;
}
