import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('notes')
export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsJSON()
  @IsNotEmpty()
  content: JSON;
}
