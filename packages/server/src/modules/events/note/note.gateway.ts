import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NoteGatewayService } from './note.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/note',
})
export class NoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly noteGatewayService: NoteGatewayService) {}

  afterInit(server: Server) {
    return this.noteGatewayService.onAterInit(server);
  }

  handleConnection(client: Socket) {
    return this.noteGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    return this.noteGatewayService.onDisconnect(client);
  }
}
