import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateNoteDto } from './dto';

@Injectable()
export class NotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllNotes() {
    return await this.prismaService.note.findMany();
  }

  async findNoteById(noteId: number) {
    return await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
  }

  async findNotesByUserId(userId: number) {
    return await this.prismaService.note.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async createNote(dto: CreateNoteDto, userId: number) {
    return await this.prismaService.note.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async deleteNote(noteId: number) {
    return await this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
