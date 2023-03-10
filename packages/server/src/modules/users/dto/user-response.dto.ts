import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@ApiTags('users')
export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  displayName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  githubLink: string;

  @Expose()
  @ApiProperty()
  profileImage: string;
}
