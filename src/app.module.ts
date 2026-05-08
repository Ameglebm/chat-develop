import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infra/database/prisma.module';
import { RedisModule } from './infra/cache/redis.module';
import { WebsocketModule } from './infra/websocket/websocket.module';
import { LoggerModule } from './infra/logger/logger.module';
import { RabbitMQModule } from './infra/queue/rabbitmq.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    WebsocketModule,
    LoggerModule,
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
