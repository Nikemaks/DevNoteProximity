export interface FullNoteItem {
  id: string;
  title: string;
  htmlContent: string;
  updatedAt?: string;
}

export interface UpdateInterface {
  id: string;
  title: string;
  htmlContent: string;
}

export interface FullNotesSettings {
  isDisplayType: boolean;
}
