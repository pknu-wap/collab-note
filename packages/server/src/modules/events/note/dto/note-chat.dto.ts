import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/note')
export class NoteChatDto {
  @IsString()
  @IsNotEmpty()
  noteId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
