import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  RemoteDeleteOperation,
  RemoteInsertOperation,
  SOCKET_EVENT,
} from '@collab-note/common';
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

  @SubscribeMessage(SOCKET_EVENT.REMOTE_INSERT)
  handleRemoteInsert(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { operation: RemoteInsertOperation },
  ) {
    this.crdtGatewayService.onRemoteInsert(client, data);
  }

  @SubscribeMessage(SOCKET_EVENT.REMOTE_DELETE)
  handleRemoteDelete(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { operation: RemoteDeleteOperation },
  ) {
    this.crdtGatewayService.onRemoteDelete(client, data);
  }
}
