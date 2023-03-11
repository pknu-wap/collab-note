export const EVENT = {
  // Lobby Socket Events
  JOIN_LOBBY: 'JOIN_LOBBY',
  LEAVE_LOBBY: 'LEAVE_LOBBY',
  LOBBY_CHAT: 'LOBBY_CHAT',

  // Note Socket Events

  // WebRTC
} as const;

export type Event = (typeof EVENT)[keyof typeof EVENT];
