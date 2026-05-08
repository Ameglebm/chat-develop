export const LOGGER_COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',

  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',

  orange: '\x1b[38;5;214m',

  bRed: '\x1b[91m',
  bGreen: '\x1b[92m',
  bYellow: '\x1b[93m',
  bBlue: '\x1b[94m',
  bMagenta: '\x1b[95m',
  bCyan: '\x1b[96m',

  gray: '\x1b[38;5;245m',
  silver: '\x1b[38;5;250m',
};

export const LOGGER_CONTEXT_THEMES = {
  AppGateway: {
    badge: '⚡',
    color: LOGGER_COLORS.bMagenta,
  },

  WebsocketService: {
    badge: '🔌',
    color: LOGGER_COLORS.bBlue,
  },

  RedisService: {
    badge: '⚡',
    color: LOGGER_COLORS.orange,
  },

  PrismaService: {
    badge: '🗄️',
    color: LOGGER_COLORS.bCyan,
  },

  AuthService: {
    badge: '🔐',
    color: LOGGER_COLORS.bYellow,
  },

  ChatService: {
    badge: '💬',
    color: LOGGER_COLORS.bGreen,
  },

  ChatGateway: {
    badge: '📡',
    color: LOGGER_COLORS.bMagenta,
  },

  QueueService: {
    badge: '📬',
    color: LOGGER_COLORS.cyan,
  },

  StorageService: {
    badge: '💾',
    color: LOGGER_COLORS.silver,
  },
};
