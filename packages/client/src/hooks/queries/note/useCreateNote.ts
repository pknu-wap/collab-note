import { NoteAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

export const useCreateNote = (
  options: UseMutationOptionsOf<typeof NoteAPI.createNote> = {},
) => {
  return useMutation(NoteAPI.createNote, options);
};
