import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { CrdtGatewayService } from './crdt.gateway.service';
import { RemoteDeleteDto, RemoteInsertDto, RemoteUpdateDto } from './dto';

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
  handleRemoteInsert(client: Socket, dto: RemoteInsertDto) {
    this.crdtGatewayService.onRemoteInsert(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.REMOTE_DELETE)
  handleRemoteDelete(client: Socket, dto: RemoteDeleteDto) {
    this.crdtGatewayService.onRemoteDelete(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.REMOTE_UPDATE)
  handleRemoteUpdate(client: Socket, dto: RemoteUpdateDto) {
    this.crdtGatewayService.onRemoteUpdate(client, dto);
  }
}
