import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '~/modules/users/dto/user-response.dto';

@Exclude()
export class NoteResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: JSON;

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto;

  @Expose()
  ownerId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
