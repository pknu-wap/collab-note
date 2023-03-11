import { Socket, io } from 'socket.io-client';
import { SOCKET_EVENT, SOCKET_URL } from '~/constants';

class NoteSocket {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  private generateNoteSocket() {
    this.socket = io(SOCKET_URL.NOTE, {
      transports: ['websocket', 'polling'],
    });
  }

  initNoteSocket() {
    if (this.socket === null) {
      this.generateNoteSocket();
    }
    this.socket?.connect();
  }

  joinNote(noteId: string) {
    this.socket?.emit(SOCKET_EVENT.JOIN_NOTE, { noteId });
  }

  sendMessage({ noteId, message }: SendMessageParams) {
    this.socket?.emit(SOCKET_EVENT.NOTE_CHAT, { noteId, message });
  }

  receiveMessage({ done }: ReceiveMessageParams) {
    this.socket?.on(SOCKET_EVENT.NOTE_CHAT, ({ message }) => {
      done(message);
    });
  }

  leaveNote(noteId: string) {
    this.socket?.emit(SOCKET_EVENT.LEAVE_NOTE, { noteId });
    this.socket?.off(SOCKET_EVENT.NOTE_CHAT);
    this.socket?.off(SOCKET_EVENT.JOIN_NOTE);
    this.socket?.off(SOCKET_EVENT.LEAVE_NOTE);
    this.socket?.disconnect();
  }
}

const noteSocket = new NoteSocket();

export default noteSocket;

interface SendMessageParams {
  noteId: string;
  message: string;
}

interface ReceiveMessageParams {
  done: (message: string) => void;
}
