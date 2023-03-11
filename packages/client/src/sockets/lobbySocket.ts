import { Socket, io } from 'socket.io-client';
import { SOCKET_EVENT, SOCKET_URL } from '~/constants';

class LobbySocket {
  private static instance: LobbySocket;
  private socket: Socket;

  // The constructor is private, so it can only be called from within the class.
  private constructor() {
    this.socket = io(SOCKET_URL.LOBBY, {
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

  joinLobby() {
    this.socket.emit(SOCKET_EVENT.JOIN_LOBBY);
  }

  sendMessage({ message }: { message: string }) {
    this.socket.emit(SOCKET_EVENT.LOBBY_CHAT, { message });
  }

  receiveMessage({ done }: { done: (message: string) => void }) {
    this.socket.on(SOCKET_EVENT.LOBBY_CHAT, ({ message }) => {
      done(message);
    });
  }

  leaveLobby() {
    this.socket.emit(SOCKET_EVENT.LEAVE_LOBBY);
    this.socket.off(SOCKET_EVENT.LOBBY_CHAT);
    this.socket.off(SOCKET_EVENT.JOIN_LOBBY);
    this.socket.off(SOCKET_EVENT.LEAVE_LOBBY);
  }
}

export const lobbySocketInstance = LobbySocket.getInstance();
