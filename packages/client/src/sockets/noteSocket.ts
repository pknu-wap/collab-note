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

  receiveExistingNoteUsers({ done }: ReceiveExistingNoteUsersParams) {
    this.socket?.on(SOCKET_EVENT.EXISTING_NOTE_USERS, ({ users }) => {
      done(users);
    });
  }

  leftNote({ done }: LeftNoteParams) {
    this.socket?.on(SOCKET_EVENT.LEFT_NOTE, ({ sid }) => {
      done(sid);
    });
  }

  leaveNote(noteId: string) {
    console.log('leaveNote');
    this.socket?.emit(SOCKET_EVENT.LEAVE_NOTE, { noteId });
    this.socket?.off(SOCKET_EVENT.NOTE_CHAT);
    this.socket?.off(SOCKET_EVENT.JOIN_NOTE);
    this.socket?.off(SOCKET_EVENT.LEAVE_NOTE);
    this.socket?.off(SOCKET_EVENT.EXISTING_NOTE_USERS);
    this.socket?.off(SOCKET_EVENT.LEFT_NOTE);
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

interface ReceiveExistingNoteUsersParams {
  done: (users: { sid: string }[]) => void;
}

interface LeftNoteParams {
  done: (sid: string) => void;
}
