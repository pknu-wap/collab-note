import { HttpException, Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto';

@Injectable()
export class NotesService {
  constructor(private readonly noteRepository: NotesRepository) {}

  async getAllNotesList() {
    return await this.noteRepository.findAllNotesList();
  }

  async getNoteById(noteId: number) {
    const note = await this.noteRepository.findNoteById(noteId);
    if (!note) throw new HttpException('Note not found', 404);
    return note;
  }

  async getNotesListByUserId(userId: number) {
    return await this.noteRepository.findNotesListByUserId(userId);
  }

  async createNote(dto: CreateNoteDto, userId: number) {
    return await this.noteRepository.createNote(dto, userId);
  }

  async deleteNote(noteId: number, userId: number) {
    const note = await this.getNoteById(noteId);
    if (note.ownerId !== userId) throw new HttpException('Unauthorized', 401);
    return await this.noteRepository.deleteNote(noteId);
  }
}
