import { IsNotEmpty, IsString } from 'class-validator';

export class LobbyChatDto {
  @IsNotEmpty()
  @IsString()
  sid: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
