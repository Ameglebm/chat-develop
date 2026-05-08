import { Global, Module } from '@nestjs/common';

import { AppGateway } from './gateways/app.gateway';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  providers: [AppGateway, WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
