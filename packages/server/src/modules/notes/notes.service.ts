import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}
}
