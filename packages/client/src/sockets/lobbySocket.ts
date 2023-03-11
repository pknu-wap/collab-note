import { Socket, io } from 'socket.io-client';
import { SOCKET_URL } from '~/constants';

class LobbySocket {
  private static instance: LobbySocket;
  private socket: Socket;

  // class 내부에서만 생성 가능
  private constructor() {
    this.socket = io(`${SOCKET_URL.LOBBY}`, {
      transports: ['websocket'],
    });
    this.socket.connect();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new LobbySocket();
    }
    return this.instance;
  }
}

export const LobbySocketInstance = LobbySocket.getInstance();
