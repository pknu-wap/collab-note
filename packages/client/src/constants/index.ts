export const BASE_URL: string =
  import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const API_URL = {} as const;

export const PAGE_LIST = {
  HOME: '/',
  NOTE: '/note',
  CRDT: '/crdt',
} as const;

export const SOCKET_URL = {
  LOBBY: `${BASE_URL}/socket/lobby`,
  NOTE: `${BASE_URL}/socket/note`,
  CRDT: `${BASE_URL}/socket/crdt`,
} as const;

export const SOCKET_EVENT = {
  // Lobby Socket Events
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',

  // Note Socket Events
  JOIN_NOTE: 'JOIN_NOTE',
  LEAVE_NOTE: 'LEAVE_NOTE',
  LEFT_NOTE: 'LEFT_NOTE',
  NOTE_CHAT: 'NOTE_CHAT',

  // Note Socket Events - WebRTC
  EXISTING_NOTE_USERS: 'EXISTING_NOTE_USERS',
  NEW_USER: 'NEW_USER',
  SEND_OFFER: 'SEND_OFFER',
  RECEIVED_OFFER: 'RECEIVED_OFFER',
  SEND_ANSWER: 'SEND_ANSWER',
  RECEIVED_ANSWER: 'RECEIVED_ANSWER',
  SEND_ICE_CANDIDATE: 'SEND_ICE_CANDIDATE',
  RECEIVED_ICE_CANDIDATE: 'RECEIVED_ICE_CANDIDATE',

  // Note Socket Events - CRDT
  LOCAL_INSERT: 'LOCAL_INSERT',
  LOCAL_DELETE: 'LOCAL_DELETE',
  LOCAL_UPDATE: 'LOCAL_UPDATE',
  REMOTE_INSERT: 'REMOTE_INSERT',
  REMOTE_DELETE: 'REMOTE_DELETE',
  REMOTE_UPDATE: 'REMOTE_UPDATE',
} as const;
