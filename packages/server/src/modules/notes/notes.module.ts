import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
