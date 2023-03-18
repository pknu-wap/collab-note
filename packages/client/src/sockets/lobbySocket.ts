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

  sendMessage({ text }: { text: string }) {
    this.socket?.emit(SOCKET_EVENT.LOBBY_CHAT, {
      sid: this.socket.id,
      text,
    });
  }

  receiveMessage({
    done,
  }: {
    done: (text: string, isMyMessage: boolean, timeStamp: string) => void;
  }) {
    this.socket?.on(SOCKET_EVENT.LOBBY_CHAT, ({ sid, text, timeStamp }) => {
      done(text, sid === this.socket?.id, timeStamp);
    });
  }

  leaveLobby() {
    this.socket?.off(SOCKET_EVENT.LOBBY_CHAT);
    this.socket?.disconnect();
  }
}

const lobbySocket = new LobbySocket();

export default lobbySocket;
