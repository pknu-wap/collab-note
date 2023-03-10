export const EVENT = {
  // Lobby Socket Events
  JOIN_LOBBY: 'join_lobby',
  LEAVE_LOBBY: 'leave_lobby',
  JOINED_LOBBY: 'joined_lobby',
  LEFT_LOBBY: 'left_lobby',
  LOBBY_CHAT: 'lobby_chat',

  // Note Socket Events

  // WebRTC
} as const;

export type Event = (typeof EVENT)[keyof typeof EVENT];
