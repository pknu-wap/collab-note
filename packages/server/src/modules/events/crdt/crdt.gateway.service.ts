import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class CrdtGatewayService {
  private server: Server;
  private logger = new Logger('CrdtGatewayService');

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('CrdtGatewayService initialized');
  }

  onConnection(client: Socket) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
