import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '@collab-note/common';
import { RemoteDeleteDto, RemoteInsertDto, RemoteUpdateDto } from './dto';
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

  async onRemoteInsert(client: Socket, { id, operation }: RemoteInsertDto) {
    // id는 block id를 의미한다.
    try {
      this.crdt.remoteInsert(operation);
      client.broadcast.emit(SOCKET_EVENT.LOCAL_INSERT, { id, operation });
    } catch (error) {
      //TODO: 이전 상태로 돌리기
      this.logger.error(error);
    }
  }

  onRemoteDelete(client: Socket, { id, operation }: RemoteDeleteDto) {
    // id는 block id를 의미한다.
    try {
      this.crdt.remoteDelete(operation);
      client.broadcast.emit(SOCKET_EVENT.LOCAL_DELETE, { id, operation });
    } catch (error) {
      this.logger.error(error);
    }
  }

  onRemoteUpdate(client: Socket, { id, operations }: RemoteUpdateDto) {
    const data = {};
    client.broadcast.emit(SOCKET_EVENT.LOCAL_UPDATE, data);
  }
}
