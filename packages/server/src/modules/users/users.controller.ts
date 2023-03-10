import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetCurrentUser, Public } from '~/common/decorators';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('me')
  async getCurrentUser(
    @GetCurrentUser('userId') userId: number,
  ): Promise<UserResponseDto> {
    if (!userId) return null;

    const user = await this.usersService.getUserById(userId);

    return plainToInstance(UserResponseDto, user);
  }
}
