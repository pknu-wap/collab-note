import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { SendOfferDto, SendAnswerDto, SendIceCandidateDto } from './dto';

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

  onSendOffer(client: Socket, dto: SendOfferDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_OFFER, {
      offer: dto.offer,
      sid: client.id,
    });
  }

  onSendAnswer(client: Socket, dto: SendAnswerDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_ANSWER, {
      answer: dto.answer,
      sid: client.id,
    });
  }

  onSendIceCandidate(client: Socket, dto: SendIceCandidateDto) {
    client.to(dto.to).emit(SOCKET_EVENT.RECEIVE_ICE_CANDIDATE, {
      candidate: dto.candidate,
      sid: client.id,
    });
  }
}
