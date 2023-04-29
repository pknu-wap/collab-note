import { NoteAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

export const useGetAllNotesList = (
  options: UseQueryOptionsOf<typeof NoteAPI.getAllNotesList> = {},
) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['useGetAllNotesList'];
const fetcher = () => async () => await NoteAPI.getAllNotesList();

useGetAllNotesList.getKey = getKey;
useGetAllNotesList.fetcher = fetcher;
