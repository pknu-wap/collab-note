import { Expose } from 'class-transformer';

export class UserDto {
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

  createdAt: Date;
  updatedAt: Date;
}
