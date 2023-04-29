export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const GITHUB_OAUTH_LOGIN_URL = `${BASE_URL}/auth/github`;

export const API_URL = {
  AUTH: {
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    GET_ME: `${BASE_URL}/users/me`,
  },
  NOTE: {
    GET_ALL_NOTES_LIST: `${BASE_URL}/notes`,
    GET_NOTE_BY_ID: (noteId: string) => `${BASE_URL}/notes/${noteId}`,
    GET_NOTES_LIST_BY_USER_ID: (userId: string) =>
      `${BASE_URL}/notes/user/${userId}`,
    CREATE_NOTE: `${BASE_URL}/notes`,
    DELETE_NOTE: (noteId: string) => `${BASE_URL}/notes/${noteId}`,
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
