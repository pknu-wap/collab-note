import { API_URL } from '~/constants';
import axiosInstance from './axiosInstance';
import {
  CreateNoteParams,
  NoteListResponse,
  NoteResponse,
} from '../types/note.types';

export const NoteAPI = {
  getAllNotesList: async (): Promise<NoteListResponse> => {
    const { data } = await axiosInstance.get(API_URL.NOTE.GET_ALL_NOTES_LIST);
    return data;
  },
  getNoteById: async (noteId: number): Promise<NoteResponse> => {
    const { data } = await axiosInstance.get(
      API_URL.NOTE.GET_NOTE_BY_ID(noteId),
    );
    return data;
  },
  getNotesListByUserId: async (userId: number): Promise<NoteListResponse> => {
    const { data } = await axiosInstance.get(
      API_URL.NOTE.GET_NOTES_LIST_BY_USER_ID(userId),
    );
    return data;
  },
  createNote: async (params: CreateNoteParams): Promise<void> => {
    const { data } = await axiosInstance.post(API_URL.NOTE.CREATE_NOTE, params);
    return data;
  },
  deleteNote: async (noteId: number): Promise<void> => {
    const { data } = await axiosInstance.delete(
      API_URL.NOTE.DELETE_NOTE(noteId),
    );
    return data;
  },
};
