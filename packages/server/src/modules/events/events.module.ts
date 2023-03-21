import { Module } from '@nestjs/common';
import { NoteGateway, NoteGatewayService } from './note';
import { CrdtGateway, CrdtGatewayService } from './crdt';

@Module({
  providers: [
    // note
    NoteGateway,
    NoteGatewayService,
    // crdt
    CrdtGateway,
    CrdtGatewayService,
  ],
})
export class EventsModule {}
