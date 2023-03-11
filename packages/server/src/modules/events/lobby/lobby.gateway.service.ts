import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
import { LobbyChatDto } from './dto';

@Injectable()
export class LobbyGatewayService {
  private server: Server;
  private logger = new Logger('LobbyGatewayService');

  constructor() {
    //
  }

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('LobbyGatewayService initialized');
  }

  onConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  onJoinLobby(client: Socket) {
    client.emit(EVENT.LOBBY_CHAT, { message: `Joined Lobby: ${client.id}` });
  }

  onLeaveLobby(client: Socket) {
    client.emit(EVENT.LOBBY_CHAT, { message: `Left Lobby: ${client.id}` });
  }

  onLobbyChat(client: Socket, dto: LobbyChatDto) {
    client.emit(EVENT.LOBBY_CHAT, { message: `${client.id}: ${dto.message}` });
  }
}
