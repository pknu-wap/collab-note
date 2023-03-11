import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/note')
export class LeaveNoteDto {
  @IsString()
  @IsNotEmpty()
  noteId: string;
}
