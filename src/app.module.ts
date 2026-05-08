import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infra/database/prisma.module';
import { RedisModule } from './infra/cache/redis.module';
import { WebsocketModule } from './infra/websocket/websocket.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
