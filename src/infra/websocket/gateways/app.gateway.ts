import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { LoggerService } from '../../logger/logger.service';

import { WebsocketService } from '../websocket.service';

@WebSocketGateway({
  cors: {
    origin: process.env.WS_CORS_ORIGIN ?? '*',
  },
  pingInterval: 25000,
  pingTimeout: 10000,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly websocketService: WebsocketService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AppGateway.name);
  }

  afterInit() {
    this.websocketService.setServer(this.server);
    this.logger.success('Websocket iniciado');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.warn(`Cliente desconectado: ${client.id}`);
  }
}
