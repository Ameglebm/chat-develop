import { Injectable } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class WebsocketService {
  private server!: Server;

  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('WebsocketService');
  }

  setServer(server: Server): void {
    this.server = server;
    this.logger.success('Server registrado');
  }

  private getServerOrThrow(): Server {
    if (!this.server) {
      throw new Error('WebSocket server não inicializado');
    }
    return this.server;
  }

  getServer(): Server {
    return this.getServerOrThrow();
  }

  emit(event: string, data: unknown): void {
    this.getServerOrThrow().emit(event, data);
  }

  emitToRoom(room: string, event: string, data: unknown): void {
    this.getServerOrThrow().to(room).emit(event, data);
  }

  joinRoom(client: Socket, room: string): void {
    client.join(room);
    this.logger.debug(`Socket ${client.id} entrou na sala ${room}`);
  }

  leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    this.logger.debug(`Socket ${client.id} saiu da sala ${room}`);
  }
}
