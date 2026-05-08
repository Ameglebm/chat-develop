import { Global, Module } from '@nestjs/common';

import { AppGateway } from './app.gateway';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  providers: [
    AppGateway,
    WebsocketService,
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}