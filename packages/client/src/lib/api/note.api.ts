import { API_URL } from '~/constants';
import axiosInstance from './axiosInstance';
import { CreateNoteParams } from '../types/note.types';

export const NoteAPI = {
  getAllNotesList: async () => {
    const { data } = await axiosInstance.get(API_URL.NOTE.GET_ALL_NOTES_LIST);
    return data;
  },

  getNoteById: async (noteId: number) => {
    const { data } = await axiosInstance.get(
      API_URL.NOTE.GET_NOTE_BY_ID(noteId),
    );
    return data;
  },

  getNotesListByUserId: async (userId: number) => {
    const { data } = await axiosInstance.get(
      API_URL.NOTE.GET_NOTES_LIST_BY_USER_ID(userId),
    );
    return data;
  },

  createNote: async (params: CreateNoteParams) => {
    const { data } = await axiosInstance.post(API_URL.NOTE.CREATE_NOTE, params);
    return data;
  },
  deleteNote: async (noteId: number) => {
    const { data } = await axiosInstance.delete(
      API_URL.NOTE.DELETE_NOTE(noteId),
    );
    return data;
  },
};
