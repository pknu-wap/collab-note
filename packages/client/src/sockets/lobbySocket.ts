import { Socket, io } from 'socket.io-client';
import { SOCKET_EVENT, SOCKET_URL } from '~/constants';

class LobbySocket {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  private generateLobbySocket() {
    this.socket = io(SOCKET_URL.LOBBY, {
      transports: ['websocket', 'polling'],
    });
  }

  initLobbySocket() {
    if (this.socket === null) {
      this.generateLobbySocket();
    }
    this.socket?.connect();
  }

  joinLobby() {
    this.socket?.emit(SOCKET_EVENT.JOIN_LOBBY);
  }

  sendMessage({ message }: { message: string }) {
    this.socket?.emit(SOCKET_EVENT.LOBBY_CHAT, { message });
  }

  receiveMessage({ done }: { done: (message: string) => void }) {
    this.socket?.on(SOCKET_EVENT.LOBBY_CHAT, ({ message }) => {
      done(message);
    });
  }

  leaveLobby() {
    this.socket?.emit(SOCKET_EVENT.LEAVE_LOBBY);
    this.socket?.off(SOCKET_EVENT.LOBBY_CHAT);
    this.socket?.off(SOCKET_EVENT.JOIN_LOBBY);
    this.socket?.off(SOCKET_EVENT.LEAVE_LOBBY);
    this.socket?.disconnect();
  }
}

const lobbySocket = new LobbySocket();

export default lobbySocket;
