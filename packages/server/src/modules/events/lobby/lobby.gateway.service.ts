import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { LobbyChatDto } from './dto';

@Injectable()
export class LobbyGatewayService {
  private server: Server;
  private logger = new Logger('LobbyGatewayService');

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('LobbyGatewayService initialized');
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

  onLobbyChat(client: Socket, dto: LobbyChatDto) {
    // send to all clients in lobby
    this.server.emit(SOCKET_EVENT.LOBBY_CHAT, {
      sid: client.id,
      text: dto.text,
      timeStamp: new Date(),
    });
  }
}
