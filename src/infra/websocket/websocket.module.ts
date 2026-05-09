import { Global, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';

import { AppGateway } from './gateways/app.gateway';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [AppGateway, WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
