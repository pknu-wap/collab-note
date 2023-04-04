export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {} as const;

export const PAGE_LIST = {
  MAIN: '/',
  MY_PAGE: '/my-page',
  NOTE: (noteId: string) => `/note/${noteId}`,
  SETTING: '/setting',
} as const;

export const SOCKET_URL = {
  NOTE: `${BASE_URL}/socket/note`,
  CRDT: `${BASE_URL}/socket/crdt`,
} as const;
