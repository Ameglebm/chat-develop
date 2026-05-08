import {
  Injectable,
  LoggerService as NestLoggerService,
  Scope,
} from '@nestjs/common';

import {
  LOGGER_COLORS,
  LOGGER_CONTEXT_THEMES,
} from './logger.constants';

export enum LogLevel {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService
  implements NestLoggerService
{
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(
    message: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.INFO,
      message,
      metadata,
    );
  }

  success(
    message: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.SUCCESS,
      message,
      metadata,
    );
  }

  warn(
    message: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.WARN,
      message,
      metadata,
    );
  }

  debug(
    message: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.DEBUG,
      message,
      metadata,
    );
  }

  verbose(
    message: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.DEBUG,
      message,
      metadata,
    );
  }

  error(
    message: string,
    trace?: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog(
      LogLevel.ERROR,
      message,
      {
        ...metadata,
        ...(trace && { trace }),
      },
    );
  }

  private writeLog(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
  ) {
    const c = LOGGER_COLORS;

    const context =
      this.context ?? 'ChatDevelop';

    const theme =
      LOGGER_CONTEXT_THEMES[
        context
      ] ?? {
        badge: '◈',
        color: c.gray,
      };

    const levelStyle =
      this.getLevelStyle(level);

    const time = new Date()
      .toISOString()
      .split('T')[1]
      .slice(0, 8);

    const lvl = level.padEnd(7);

    const line = [
      `${c.dim}${time}${c.reset}`,

      `${c.bold}${levelStyle.color}${levelStyle.icon} ${lvl}${c.reset}`,

      `${c.bold}${theme.color}${theme.badge} [${context}]${c.reset}`,

      `${c.bold}${c.bCyan}${message}${c.reset}`,
    ].join(' ');

    const metaLine =
      metadata &&
      Object.keys(metadata).length > 0
        ? `\n${JSON.stringify(
            metadata,
            null,
            2,
          )
            .split('\n')
            .map(
              (line) =>
                `${c.bold}\x1b[97m         ${line}${c.reset}`,
            )
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
        console.debug(output);
        break;

      default:
        console.log(output);
    }
  }

  private getLevelStyle(
    level: LogLevel,
  ): {
    color: string;
    icon: string;
  } {
    const c = LOGGER_COLORS;

    switch (level) {
      case LogLevel.SUCCESS:
        return {
          color: c.bGreen,
          icon: '✓',
        };

      case LogLevel.INFO:
        return {
          color: c.bBlue,
          icon: 'ℹ',
        };

      case LogLevel.ERROR:
        return {
          color: c.bRed,
          icon: '✖',
        };

      case LogLevel.WARN:
        return {
          color: c.bYellow,
          icon: '⚠',
        };

      case LogLevel.DEBUG:
        return {
          color: c.dim,
          icon: '·',
        };

      default:
        return {
          color: c.gray,
          icon: '•',
        };
    }
  }
}