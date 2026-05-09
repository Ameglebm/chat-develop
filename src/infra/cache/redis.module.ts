import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import redisConfig from '../../config/redis.config';

import { LoggerModule } from '../logger/logger.module';

import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [LoggerModule, ConfigModule.forFeature(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
