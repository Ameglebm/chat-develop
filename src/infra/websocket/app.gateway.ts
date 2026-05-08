import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { WebsocketService } from './websocket.service';

@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  private readonly logger =
    new Logger(AppGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly websocketService: WebsocketService,
  ) {}

  afterInit() {
    this.websocketService.setServer(
      this.server,
    );

    this.logger.log(
      '🔥 Websocket iniciado',
    );
  }

  handleConnection(client: Socket) {
    this.logger.log(
      `🟢 Cliente conectado: ${client.id}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `🔴 Cliente desconectado: ${client.id}`,
    );
  }
}