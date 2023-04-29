import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-post.dto';
import { GetCurrentUser } from '~/common/decorators';
import { NoteDto } from './dto/note.dto';
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
}
