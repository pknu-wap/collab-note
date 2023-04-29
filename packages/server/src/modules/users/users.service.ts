import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: number) {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) return null;

    return user;
  }
}
