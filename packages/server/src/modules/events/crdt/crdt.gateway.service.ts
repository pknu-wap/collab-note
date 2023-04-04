import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  RemoteDeleteOperation,
  RemoteInsertOperation,
  SOCKET_EVENT,
} from '@collab-note/common';
import { CRDT, LinkedList } from '@collab-note/common';

@Injectable()
export class CrdtGatewayService {
  private server: Server;
  private logger = new Logger('CrdtGatewayService');
  private crdt = new CRDT(-1, new LinkedList());

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('CrdtGatewayService initialized');
  }

  onConnection(client: Socket) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
      client.emit(SOCKET_EVENT.CRDT_INIT, { data: this.crdt.data });
    } catch (error) {
      this.logger.error(error);
    }
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async onRemoteInsert(
    client: Socket,
    { operation }: { operation: RemoteInsertOperation },
  ) {
    try {
      this.crdt.remoteInsert(operation);
      client.broadcast.emit(SOCKET_EVENT.LOCAL_INSERT, { operation });
    } catch (error) {
      //TODO: 이전 상태로 돌리기
      this.logger.error(error);
    }
  }

  onRemoteDelete(
    client: Socket,
    { operation }: { operation: RemoteDeleteOperation },
  ) {
    try {
      this.crdt.remoteDelete(operation);
      client.broadcast.emit(SOCKET_EVENT.LOCAL_DELETE, { operation });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
