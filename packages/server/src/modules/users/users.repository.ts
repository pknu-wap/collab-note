import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
