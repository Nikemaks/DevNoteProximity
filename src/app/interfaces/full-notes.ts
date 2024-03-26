export interface FullNoteItem {
  id: string;
  title: string;
  htmlContent: string;
}

export interface UpdateInterface {
  notes: FullNoteItem[];
  viewNoteId: string;
}

export interface FullNotesSettings {
  isDisplayType: boolean;
}
