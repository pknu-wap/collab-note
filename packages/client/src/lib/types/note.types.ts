import { UserResponse } from './user.types';

export interface NoteResponse {
  id: number;
  title: string;
  content: JSON; // nodeMap
  ownerId: number;
  owner: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface NoteListResponse {
  list: Omit<NoteResponse, 'content'>[];
  totalCount: number;
}

export interface CreateNoteParams {
  title: string;
  content: string; // json stringified
}
