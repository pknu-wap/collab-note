import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import {
  SendOfferDto,
  SendAnswerDto,
  SendIceCandidateDto,
  JoinNoteDto,
  LeaveNoteDto,
  NoteChatDto,
} from './dto';

@Injectable()
export class NoteGatewayService {
  private server: Server;
  private logger = new Logger('NoteGatewayService');

  constructor() {
    //
  }

  onAterInit(server: Server) {
    this.server = server;
    this.logger.log('NoteGatewayService initialized');
  }

  onConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  onDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  //

  async onJoinNote(client: Socket, dto: JoinNoteDto) {
    await client.join(dto.noteId);
    client.to(dto.noteId).emit(SOCKET_EVENT.NOTE_CHAT, {
      message: `Joined Lobby: ${client.id}`,
    });
  }

  async onLeaveNote(client: Socket, dto: LeaveNoteDto) {
    await client.leave(dto.noteId);
    client.to(dto.noteId).emit(SOCKET_EVENT.NOTE_CHAT, {
      message: `Left Lobby: ${client.id}`,
    });
  }

  onNoteChat(client: Socket, dto: NoteChatDto) {
    this.server.to(dto.noteId).emit(SOCKET_EVENT.NOTE_CHAT, {
      sid: client.id,
      message: `${client.id} ${dto.message}`,
    });
  }

  //

  onSendOffer(client: Socket, dto: SendOfferDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_OFFER, {
      sid: client.id,
      offer: dto.offer,
    });
  }

  onSendAnswer(client: Socket, dto: SendAnswerDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_ANSWER, {
      sid: client.id,
      answer: dto.answer,
    });
  }

  onSendIceCandidate(client: Socket, dto: SendIceCandidateDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_ICE_CANDIDATE, {
      sid: client.id,
      candidate: dto.candidate,
    });
  }
}
