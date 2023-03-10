import { ApiTags } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@ApiTags('users')
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  displayName: string;

  @Expose()
  email: string;

  @Expose()
  githubLink: string;

  @Expose()
  profileImage: string;
}
