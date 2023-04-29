import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-post.dto';

@Injectable()
export class NotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createNote(dto: CreateNoteDto, userId: number) {
    return;
  }
}
