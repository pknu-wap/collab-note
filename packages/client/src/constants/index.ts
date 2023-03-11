export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {} as const;

export const PAGE_LIST = {
  HOME: '/',
} as const;

export const SOCKET_URL = {
  LOBBY: `${BASE_URL}/socket/lobby`,
} as const;

export const SOCKET_EVENT = {
  // lobby
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',
} as const;
