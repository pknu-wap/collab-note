export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {} as const;

export const PAGE_LIST = {
  HOME: '/',
} as const;

export const SOCKET_URL = {
  LOBBY: `${BASE_URL}/socket/lobby`,
  NOTE: `${BASE_URL}/socket/note`,
} as const;

export const SOCKET_EVENT = {
  // Lobby Socket Events
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',

  // Note Socket Events
  JOIN_NOTE: 'JOIN_NOTE',
  LEAVE_NOTE: 'LEAVE_NOTE',
  NOTE_CHAT: 'NOTE_CHAT',

  // Note Socket Events - WebRTC
  NEW_USER: 'NEW_USER',
  SEND_OFFER: 'SEND_OFFER',
  RECEIVED_OFFER: 'RECEIVED_OFFER',
  SEND_ANSWER: 'SEND_ANSWER',
  RECEIVED_ANSWER: 'RECEIVED_ANSWER',
  SEND_ICE_CANDIDATE: 'SEND_ICE_CANDIDATE',
  RECEIVED_ICE_CANDIDATE: 'RECEIVED_ICE_CANDIDATE',
} as const;
