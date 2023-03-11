import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/note')
export class SendAnswerDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  answer: RTCSessionDescriptionInit;
}
