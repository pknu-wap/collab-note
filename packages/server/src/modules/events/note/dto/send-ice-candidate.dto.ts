import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class SendIceCandidateDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  candidate: RTCIceCandidateInit;
}
