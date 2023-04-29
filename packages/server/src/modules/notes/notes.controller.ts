import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { GetCurrentUser, Public } from '~/common/decorators';
import { NoteResponseDto, CreateNoteDto, NoteListResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Public()
  @Get()
  async getAllNotesList(): Promise<NoteListResponseDto> {
    const notes = await this.notesService.getAllNotesList();
    return plainToInstance(NoteListResponseDto, notes);
  }

  @Public()
  @Get(':id')
  async getNoteById(@Param('id') id: number): Promise<NoteResponseDto> {
    const note = await this.notesService.getNoteById(id);
    return plainToInstance(NoteResponseDto, note);
  }

  @Get('user/:userId')
  async getNotesListByUserId(
    @Param('userId') userId: number,
  ): Promise<NoteListResponseDto> {
    const notes = await this.notesService.getNotesListByUserId(userId);
    return plainToInstance(NoteListResponseDto, notes);
  }

  @Post()
  async createNote(
    @Body() dto: CreateNoteDto,
    @GetCurrentUser('userId') userId: number,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.createNote(dto, userId);
    return plainToInstance(NoteResponseDto, note);
  }

  @Post(':id')
  async deleteNote(
    @Param('noteId') noteId: number,
    @GetCurrentUser('userId') userId: number,
  ): Promise<void> {
    await this.notesService.deleteNote(noteId, userId);
  }
}
