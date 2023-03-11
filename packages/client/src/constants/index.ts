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
  // Lobby Socket Events
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',

  // Note Socket Events - WebRTC
  SEND_OFFER: 'SEND_OFFER',
  RECEIVE_OFFER: 'RECEIVE_OFFER',
  SEND_ANSWER: 'SEND_ANSWER',
  RECEIVE_ANSWER: 'RECEIVE_ANSWER',
  SEND_ICE_CANDIDATE: 'SEND_ICE_CANDIDATE',
  RECEIVE_ICE_CANDIDATE: 'RECEIVE_ICE_CANDIDATE',
} as const;
