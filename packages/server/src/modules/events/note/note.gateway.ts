import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import {
  JoinNoteDto,
  LeaveNoteDto,
  NoteChatDto,
  SendAnswerDto,
  SendIceCandidateDto,
  SendOfferDto,
} from './dto';
import { NoteGatewayService } from './note.gateway.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/note',
})
export class NoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly noteGatewayService: NoteGatewayService) {}

  afterInit(server: Server) {
    this.noteGatewayService.onAterInit(server);
  }

  handleConnection(client: Socket) {
    this.noteGatewayService.onConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.noteGatewayService.onDisconnect(client);
  }

  // Note Socket

  @SubscribeMessage(SOCKET_EVENT.JOIN_NOTE)
  async handleJoinNote(client: Socket, dto: JoinNoteDto) {
    await this.noteGatewayService.onJoinNote(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.LEAVE_NOTE)
  async handleLeaveNote(client: Socket, dto: LeaveNoteDto) {
    await this.noteGatewayService.onLeaveNote(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.NOTE_CHAT)
  handleNoteChat(client: Socket, dto: NoteChatDto) {
    this.noteGatewayService.onNoteChat(client, dto);
  }

  // Note WebRTC

  @SubscribeMessage(SOCKET_EVENT.SEND_OFFER)
  handleSendOffer(client: Socket, dto: SendOfferDto) {
    this.noteGatewayService.onSendOffer(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.SEND_ANSWER)
  handleSendAnswer(client: Socket, dto: SendAnswerDto) {
    this.noteGatewayService.onSendAnswer(client, dto);
  }

  @SubscribeMessage(SOCKET_EVENT.SEND_ICE_CANDIDATE)
  handleSendIceCandidate(client: Socket, dto: SendIceCandidateDto) {
    this.noteGatewayService.onSendIceCandidate(client, dto);
  }
}
