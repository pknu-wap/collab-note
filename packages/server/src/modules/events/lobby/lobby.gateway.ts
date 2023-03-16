import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { LobbyGatewayService } from './lobby.gateway.service';
import { LobbyChatDto } from './dto';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/lobby',
})
export class LobbyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly lobbyGatewayService: LobbyGatewayService) {}

  afterInit(server: Server) {
    this.lobbyGatewayService.onAterInit(server);
  }

  handleConnection(client: Socket) {
    this.lobbyGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.lobbyGatewayService.onDisconnect(client);
  }

  // Lobby Chat
  @SubscribeMessage(SOCKET_EVENT.JOIN_LOBBY)
  handleJoinLobby(client: Socket) {
    this.lobbyGatewayService.onJoinLobby(client);
  }

  @SubscribeMessage(SOCKET_EVENT.LEAVE_LOBBY)
  handleLeaveLobby(client: Socket) {
    this.lobbyGatewayService.onLeaveLobby(client);
  }

  @SubscribeMessage(SOCKET_EVENT.LOBBY_CHAT)
  handleLobbyChat(client: Socket, dto: LobbyChatDto) {
    this.lobbyGatewayService.onLobbyChat(client, dto);
  }
}
