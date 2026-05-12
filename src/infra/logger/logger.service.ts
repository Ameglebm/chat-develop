import {
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';

import {
  LOGGER_COLORS,
  LOGGER_CONTEXT_THEMES,
  LoggerTheme,
} from './logger.constants';

export enum LogLevel {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  VERBOSE = 'VERBOSE',
}

type LogMetadata = Record<string, unknown>;

const DEFAULT_THEME: LoggerTheme = {
  badge: '◈',
  color: LOGGER_COLORS.gray,
};

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  setContext(context: string): this {
    this.context = context;
    return this;
  }

  log(message: string, metadata?: LogMetadata) {
    this.writeLog(LogLevel.INFO, message, metadata);
  }

  success(message: string, metadata?: LogMetadata) {
    this.writeLog(LogLevel.SUCCESS, message, metadata);
  }

  warn(message: string, metadata?: LogMetadata) {
    this.writeLog(LogLevel.WARN, message, metadata);
  }

  debug(message: string, metadata?: LogMetadata) {
    this.writeLog(LogLevel.DEBUG, message, metadata);
  }

  verbose(message: string, metadata?: LogMetadata) {
    this.writeLog(LogLevel.VERBOSE, message, metadata);
  }

  error(
    message: string,
    traceOrMeta?: string | LogMetadata,
    metadata?: LogMetadata,
  ) {
    const trace = typeof traceOrMeta === 'string' ? traceOrMeta : undefined;

    const meta = typeof traceOrMeta === 'object' ? traceOrMeta : metadata;

    this.writeLog(LogLevel.ERROR, message, {
      ...meta,
      ...(trace && { trace }),
    });
  }

  private writeLog(level: LogLevel, message: string, metadata?: LogMetadata) {
    const c = LOGGER_COLORS;
    const context = this.context ?? 'ChatDevelop';
    const theme: LoggerTheme =
      (LOGGER_CONTEXT_THEMES as Record<string, LoggerTheme>)[context] ??
      DEFAULT_THEME;

    const levelStyle = this.getLevelStyle(level);

    // ✅ Sem toLocaleTimeString — seguro em qualquer container
    const d = new Date();
    const time = [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((n) => n.toString().padStart(2, '0'))
      .join(':');

    const lvl = level.padEnd(8);

    const line = [
      `${c.dim}${time}${c.reset}`,
      `${c.bold}${levelStyle.color}${levelStyle.icon} ${lvl}${c.reset}`,
      `${c.bold}${theme.color}${theme.badge} [${context}]${c.reset}`,
      `${c.bold}${c.bCyan}${message}${c.reset}`,
    ].join(' ');

    const metaLine =
      metadata && Object.keys(metadata).length > 0
        ? `\n${JSON.stringify(metadata, null, 2)
            .split('\n')
            .map((l) => `${c.silver}         ${l}${c.reset}`)
            .join('\n')}`
        : '';

    const output = `${line}${metaLine}`;

    switch (level) {
      case LogLevel.ERROR:
        console.error(output);
        break;
      case LogLevel.WARN:
        console.warn(output);
        break;
      case LogLevel.DEBUG:
      case LogLevel.VERBOSE:
        console.debug(output);
        break;
      default:
        console.log(output);
    }
  }

  private getLevelStyle(level: LogLevel): { color: string; icon: string } {
    const c = LOGGER_COLORS;

    switch (level) {
      case LogLevel.SUCCESS:
        return { color: c.bGreen, icon: '✓' };
      case LogLevel.INFO:
        return { color: c.bBlue, icon: 'ℹ' };
      case LogLevel.ERROR:
        return { color: c.bRed, icon: '✖' };
      case LogLevel.WARN:
        return { color: c.bYellow, icon: '⚠' };
      case LogLevel.DEBUG:
        return { color: c.gray, icon: '·' };
      case LogLevel.VERBOSE:
        return { color: c.dim, icon: '»' };
      default:
        return { color: c.gray, icon: '•' };
    }
  }
}
