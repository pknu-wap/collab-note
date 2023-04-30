export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {
  AUTH: {
    GITHUB_OAUTH_LOGIN: `${BASE_URL}/auth/github`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    GET_ME: `${BASE_URL}/users/me`,
  },
  NOTE: {
    GET_ALL_NOTES_LIST: `${BASE_URL}/notes`,
    GET_NOTE_BY_ID: (noteId: number) => `${BASE_URL}/notes/${noteId}`,
    GET_NOTES_LIST_BY_USER_ID: (userId: number) =>
      `${BASE_URL}/notes/user/${userId}`,
    CREATE_NOTE: `${BASE_URL}/notes`,
    DELETE_NOTE: (noteId: number) => `${BASE_URL}/notes/${noteId}`,
  },
} as const;

export const PAGE_LIST = {
  HOME: '/',
  MAIN: '/main',
  MY_PAGE: '/my-page',
  NOTE: (noteId: string) => `/note/${noteId}`,
  NOTE_CREATE: `/note/create`,
  SETTING: '/setting',
} as const;

export const SOCKET_URL = {
  NOTE: `${BASE_URL}/socket/note`,
  CRDT: `${BASE_URL}/socket/crdt`,
} as const;
