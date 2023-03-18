import { Socket, io } from 'socket.io-client';
import { SOCKET_URL } from '~/constants';

class CrdtSocket {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  private generateCrdtSocket() {
    this.socket = io(SOCKET_URL.CRDT, {
      transports: ['websocket', 'polling'],
    });
  }

  initCrdtSocket() {
    if (this.socket === null) {
      this.generateCrdtSocket();
    }
    this.socket?.connect();
  }

  leaveCrdt() {
    this.socket?.disconnect();
  }
}

const crdtSocket = new CrdtSocket();

export default crdtSocket;
