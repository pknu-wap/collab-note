import { Exclude, Expose } from 'class-transformer';
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
  owner: UserResponseDto;

  @Expose()
  ownerId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
