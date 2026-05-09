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
} as const;

export type LoggerColor = (typeof LOGGER_COLORS)[keyof typeof LOGGER_COLORS];

export interface LoggerTheme {
  badge: string;
  color: LoggerColor;
}

export const LOGGER_CONTEXT_THEMES = {
  AppGateway: {
    badge: '📡',
    color: LOGGER_COLORS.bMagenta,
  },
  ChatGateway: {
    badge: '💬',
    color: LOGGER_COLORS.bMagenta,
  },
  WebsocketService: {
    badge: '🔌',
    color: LOGGER_COLORS.bBlue,
  },
  RabbitMQService: {
    badge: '🐰',
    color: LOGGER_COLORS.orange,
  },
  RabbitPublisher: {
    badge: '📤',
    color: LOGGER_COLORS.bCyan,
  },
  RabbitConsumer: {
    badge: '📥',
    color: LOGGER_COLORS.bGreen,
  },
  RedisService: {
    badge: '🧠',
    color: LOGGER_COLORS.orange,
  },
  PrismaService: {
    badge: '🗄️',
    color: LOGGER_COLORS.bCyan,
  },
  StorageService: {
    badge: '💾',
    color: LOGGER_COLORS.silver,
  },
  LocalStorageProvider: {
    badge: '📁',
    color: LOGGER_COLORS.bBlue,
  },
  S3StorageProvider: {
    badge: '☁️',
    color: LOGGER_COLORS.bCyan,
  },
  AuthService: {
    badge: '🔐',
    color: LOGGER_COLORS.bYellow,
  },
  UserService: {
    badge: '👤',
    color: LOGGER_COLORS.bGreen,
  },
  ChatService: {
    badge: '💬',
    color: LOGGER_COLORS.bGreen,
  },
  QueueService: {
    badge: '📬',
    color: LOGGER_COLORS.cyan,
  },
  NotificationService: {
    badge: '🔔',
    color: LOGGER_COLORS.bYellow,
  },
  HttpExceptionFilter: {
    badge: '🚨',
    color: LOGGER_COLORS.bRed,
  },
  PrismaExceptionFilter: {
    badge: '🧱',
    color: LOGGER_COLORS.bRed,
  },
} as const satisfies Record<string, LoggerTheme>;

// Exporta o tipo das chaves válidas usa no service
export type LoggerContext = keyof typeof LOGGER_CONTEXT_THEMES;
