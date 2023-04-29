import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
export class CreateNoteDto {
  title: string;
  content: string;
}
