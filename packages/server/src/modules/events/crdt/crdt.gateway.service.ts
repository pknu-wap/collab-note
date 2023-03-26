import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { RemoteDeleteDto, RemoteInsertDto, RemoteUpdateDto } from './dto';
import CRDT from '~/lib/crdt/crdt';
import LinkedList from '~/lib/crdt/linkedList';
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
    } catch (error) {
      this.logger.error(error);
    }
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async onRemoteInsert(client: Socket, { id, operation }: RemoteInsertDto) {
    this.logger.verbose(
      `RemoteInsert: id:${id}, clock:${operation.node.id.clock} value:${operation.node.value}`,
    );

    try {
      this.crdt.remoteInsert(operation);
      client.broadcast.emit(SOCKET_EVENT.LOCAL_INSERT, { id, operation });
    } catch (error) {
      // 이전 상태로 돌리기
      // initBlock(id);
      this.logger.error(error);
    }
  }

  onRemoteDelete(client: Socket, { id, operation }: RemoteDeleteDto) {
    const data = {};
    this.server.emit(SOCKET_EVENT.LOCAL_DELETE, data);
  }

  onRemoteUpdate(client: Socket, { id, operations }: RemoteUpdateDto) {
    const data = {};
    this.server.emit(SOCKET_EVENT.LOCAL_UPDATE, data);
  }
}
