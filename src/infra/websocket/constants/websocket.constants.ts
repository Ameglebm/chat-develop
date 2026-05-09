export const WEBSOCKET_EVENTS = {
  CHAT_MESSAGE: 'chat.message',
  CHAT_TYPING: 'chat.typing',
  USER_ONLINE: 'user.online',
  USER_OFFLINE: 'user.offline',
} as const;

export const WEBSOCKET_ROOMS = {
  GLOBAL_CHAT: 'global.chat',
} as const;

export type WebsocketEvent =
  (typeof WEBSOCKET_EVENTS)[keyof typeof WEBSOCKET_EVENTS];
