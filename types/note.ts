export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}