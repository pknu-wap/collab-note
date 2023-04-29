import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NoteDto {
  @Expose()
  id: string;
}
