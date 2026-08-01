import axios from 'axios';
import { Note, type FetchNotesResponse, type CreateNotePayload } from '@/types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchNotes = async (
  page: number = 1,
  search: string | number = ''
): Promise<FetchNotesResponse> => {
  try {
    const params: Record<string, unknown> = {
      page: Number(page) || 1,
    };

    if (typeof search === 'string' && search.trim() !== '') {
      params.search = search.trim();
    }

    const response = await api.get('/notes', { params });
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при получении заметок:', error);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await api.post<Note>('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};