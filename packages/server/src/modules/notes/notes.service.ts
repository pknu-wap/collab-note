import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-post.dto';

@Injectable()
export class NotesService {
  constructor(private readonly noteRepository: NotesRepository) {}

  async createNote(dto: CreateNoteDto, userId: number) {
    return await this.noteRepository.createNote(dto, userId);
  }
}
