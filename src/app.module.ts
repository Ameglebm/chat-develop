import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import rabbitmqConfig from './config/rabbitmq.config';
import redisConfig from './config/redis.config';
import websocketConfig from './config/websocket.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './infra/logger/logger.module';
import { PrismaModule } from './infra/database/prisma.module';
import { RedisModule } from './infra/cache/redis.module';
import { RabbitMQModule } from './infra/queue/rabbitmq.module';
import { WebsocketModule } from './infra/websocket/websocket.module';
import { StorageModule } from './infra/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        rabbitmqConfig,
        redisConfig,
        websocketConfig,
      ],
    }),
    LoggerModule,
    PrismaModule,
    RedisModule,
    RabbitMQModule,
    WebsocketModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
