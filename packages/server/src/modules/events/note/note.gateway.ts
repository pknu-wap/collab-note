import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENT } from '~/common/constants';
import { SendAnswerDto, SendIceCandidateDto, SendOfferDto } from './dto';
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
