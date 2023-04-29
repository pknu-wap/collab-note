import { NoteAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

export const useGetNotesListByUserId = (
  userId: number,
  options: UseQueryOptionsOf<typeof NoteAPI.getNotesListByUserId> = {},
) => {
  return useQuery(getKey(userId), fetcher(userId), options);
};

const getKey = (userId: number) => ['useGetNotesListByUserId', `${userId}`];
const fetcher = (userId: number) => async () =>
  await NoteAPI.getNotesListByUserId(userId);

useGetNotesListByUserId.getKey = getKey;
useGetNotesListByUserId.fetcher = fetcher;
