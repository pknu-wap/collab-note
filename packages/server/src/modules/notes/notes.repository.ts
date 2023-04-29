import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateNoteDto } from './dto';
@Injectable()
export class NotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllNotesList() {
    const [list, totalCount] = await Promise.all([
      this.prismaService.note.findMany({
        include: {
          ...noteListSelector,
        },
      }),
      this.prismaService.note.count(),
    ]);

    return {
      list,
      totalCount,
    };
  }

  async findNotesListByUserId(userId: number) {
    const [list, totalCount] = await Promise.all([
      this.prismaService.note.findMany({
        where: {
          ownerId: userId,
        },
        include: {
          ...noteListSelector,
        },
      }),
      this.prismaService.note.count({
        where: {
          ownerId: userId,
        },
      }),
    ]);

    return {
      list,
      totalCount,
    };
  }

  async findNoteById(noteId: number) {
    return await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
      include: {
        ...noteSelector,
      },
    });
  }

  async createNote(dto: CreateNoteDto, userId: number) {
    return await this.prismaService.note.create({
      data: {
        title: dto.title,
        content: JSON.stringify(dto.content), //TODO: 이 부분 좀 봐야할 듯...
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

const noteSelector = {
  owner: {
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      profileImage: true,
    },
  },
};

const noteListSelector = {
  content: false,
  owner: {
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      profileImage: true,
    },
  },
};
