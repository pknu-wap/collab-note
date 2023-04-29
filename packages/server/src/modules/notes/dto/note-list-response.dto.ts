import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { NoteResponseDto } from './note-response.dto';

@Exclude()
export class NoteListResponseDto {
  @Expose()
  @Type(() => NoteResponseDto)
  // content is excluded because it's not needed in the list
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Transform(({ value }) => value.map(({ content, ...note }) => note))
  list: NoteResponseDto[];

  @Expose()
  totalCount: number;
}
