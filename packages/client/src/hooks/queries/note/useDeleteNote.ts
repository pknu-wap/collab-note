import { NoteAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

export const useDeleteNote = (
  options: UseMutationOptionsOf<typeof NoteAPI.deleteNote> = {},
) => {
  return useMutation(NoteAPI.deleteNote, options);
};
