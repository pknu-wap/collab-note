import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class NoteGatewayService {
  private server: Server;
  private logger = new Logger('NoteGatewayService');

  constructor() {
    //
  }

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('NoteGatewayService initialized');
  }

  onConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
