import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { GetCurrentUser, Public } from '~/common/decorators';
import { NoteResponseDto, CreateNoteDto } from './dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Public()
  @Get()
  async getAllNotes(): Promise<NoteResponseDto[]> {
    const notes = await this.notesService.getAllNotes();
    return plainToInstance(NoteResponseDto, notes);
  }

  @Public()
  @Get(':id')
  async getNoteById(@Param('id') id: number): Promise<NoteResponseDto> {
    const note = await this.notesService.getNoteById(id);
    return plainToInstance(NoteResponseDto, note);
  }

  @Get('user/:userId')
  async getNotesByUserId(
    @Param('userId') userId: number,
  ): Promise<NoteResponseDto[]> {
    const notes = await this.notesService.getNotesByUserId(userId);
    return plainToInstance(NoteResponseDto, notes);
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
