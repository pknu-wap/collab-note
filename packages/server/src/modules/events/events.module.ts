import { Module } from '@nestjs/common';
import { LobbyGateway, LobbyGatewayService } from './lobby';
import { NoteGateway, NoteGatewayService } from './note';
import { CrdtGateway, CrdtGatewayService } from './crdt';

@Module({
  providers: [
    // lobby
    LobbyGateway,
    LobbyGatewayService,
    // note
    NoteGateway,
    NoteGatewayService,
    // crdt
    CrdtGateway,
    CrdtGatewayService,
  ],
})
export class EventsModule {}
