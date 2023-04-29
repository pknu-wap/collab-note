import { NoteAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

export const useGetNoteById = (
  noteId: number,
  options: UseQueryOptionsOf<typeof NoteAPI.getNoteById> = {},
) => {
  return useQuery(getKey(noteId), fetcher(noteId), options);
};

const getKey = (noteId: number) => ['useGetNoteById', `${noteId}`];
const fetcher = (noteId: number) => async () =>
  await NoteAPI.getNoteById(noteId);

useGetNoteById.getKey = getKey;
useGetNoteById.fetcher = fetcher;
