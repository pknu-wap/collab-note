import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENT } from '~/common/constants';
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
    return this.lobbyGatewayService.onAterInit(server);
  }

  handleConnection(client: Socket) {
    return this.lobbyGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.lobbyGatewayService.onDisconnect(client);
  }

  // Lobby Chat
  @SubscribeMessage(EVENT.JOIN_LOBBY)
  handleJoinLobby(client: Socket) {
    return this.lobbyGatewayService.onJoinLobby(client);
  }

  @SubscribeMessage(EVENT.LEAVE_LOBBY)
  handleLeaveLobby(client: Socket) {
    return this.lobbyGatewayService.onLeaveLobby(client);
  }

  @SubscribeMessage(EVENT.LOBBY_CHAT)
  handleLobbyChat(client: Socket, dto: LobbyChatDto) {
    return this.lobbyGatewayService.onLobbyChat(client, dto);
  }
}
