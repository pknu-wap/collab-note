import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CrdtGatewayService } from './crdt.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/crdt',
})
export class CrdtGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly crdtGatewayService: CrdtGatewayService) {}

  afterInit(server: Server) {
    this.crdtGatewayService.onAterInit(server);
  }

  handleConnection(client: Socket) {
    this.crdtGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.crdtGatewayService.onDisconnect(client);
  }
}
