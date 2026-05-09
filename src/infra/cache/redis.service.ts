import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import type { ConfigType } from '@nestjs/config';

import Redis from 'ioredis';

import redisConfig from '../../config/redis.config';

import { LoggerService } from '../logger/logger.service';

import { REDIS_DEFAULT_TTL } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis: Redis;

  constructor(
    private readonly logger: LoggerService,
    @Inject(redisConfig.KEY)
    private readonly config: ConfigType<typeof redisConfig>,
  ) {
    this.logger.setContext('RedisService');

    this.redis = new Redis({
      host: this.config.host,
      port: this.config.port,
      password: this.config.password,
      lazyConnect: true,
    });

    this.redis.on('error', (err) =>
      this.logger.error('Erro na conexão Redis', err.message),
    );
  }

  async onModuleInit(): Promise<void> {
    await this.redis.connect();
    this.logger.success('Conectado ao Redis');
  }

  async onModuleDestroy(): Promise<void> {
    await this.redis.quit();
    this.logger.warn('Conexão Redis encerrada');
  }

  async set(
    key: string,
    value: unknown,
    ttl: number = REDIS_DEFAULT_TTL,
  ): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      this.logger.error('Erro ao fazer parse do valor Redis', undefined, {
        key,
      });
      return null;
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async setNx(
    key: string,
    value: unknown,
    ttl: number = REDIS_DEFAULT_TTL,
  ): Promise<boolean> {
    const result = await this.redis.set(
      key,
      JSON.stringify(value),
      'EX',
      ttl,
      'NX',
    );
    return result === 'OK';
  }
}
