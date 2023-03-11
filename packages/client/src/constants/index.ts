export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {} as const;

export const PAGE_LIST = {
  HOME: '/',
} as const;

export const SOCKET_URL = {
  LOBBY: '/socket/lobby',
} as const;

export const SOCKET_EVENT = {
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  JOINED_LOBBY: 'JOINED_LOBBY',
  LEFT_LOBBY: 'LEFT_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',
} as const;
