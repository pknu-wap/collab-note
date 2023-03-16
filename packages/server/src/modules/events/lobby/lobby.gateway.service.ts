import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
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
    try {
      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error(error);
    }

    client.on('disconnecting', () => this.onDisconnecting(client));
  }

  private onDisconnecting(client: Socket) {
    client.broadcast.emit(SOCKET_EVENT.LOBBY_CHAT, {
      message: `Left Lobby: ${client.id}`,
    });
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  onJoinLobby(client: Socket) {
    // send to all clients in lobby except sender
    client.broadcast.emit(SOCKET_EVENT.LOBBY_CHAT, {
      message: `Joined Lobby: ${client.id}`,
    });
  }

  onLeaveLobby(client: Socket) {
    // send to all clients in lobby except sender
    client.broadcast.emit(SOCKET_EVENT.LOBBY_CHAT, {
      message: `Left Lobby: ${client.id}`,
    });
  }

  onLobbyChat(client: Socket, dto: LobbyChatDto) {
    // send to all clients in lobby
    this.server.emit(SOCKET_EVENT.LOBBY_CHAT, {
      message: `${client.id}: ${dto.message}`,
    });
  }
}
