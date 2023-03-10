import { Module } from '@nestjs/common';
import { LobbyGateway, LobbyGatewayService } from './lobby';
import { NoteGateway, NoteGatewayService } from './note';

@Module({
  providers: [
    // lobby
    LobbyGateway,
    LobbyGatewayService,
    // note
    NoteGateway,
    NoteGatewayService,
  ],
})
export class EventsModule {}
