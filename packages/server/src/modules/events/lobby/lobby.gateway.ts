import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyGatewayService } from './lobby.gateway.service';

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
}
