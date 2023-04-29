import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { GetCurrentUser } from '~/common/decorators';
import { NoteDto, CreateNoteDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Body() dto: CreateNoteDto,
    @GetCurrentUser('userId') userId: number,
  ): Promise<NoteDto> {
    const note = await this.notesService.createNote(dto, userId);
    return plainToInstance(NoteDto, note);
  }

  @Post(':id')
  async deleteNote(
    @Param('noteId') noteId: number,
    @GetCurrentUser('userId') userId: number,
  ): Promise<void> {
    await this.notesService.deleteNote(noteId, userId);
  }
}
