import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/note')
export class JoinNoteDto {
  @IsString()
  @IsNotEmpty()
  noteId: string;
}
