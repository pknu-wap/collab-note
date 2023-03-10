import { IsNotEmpty, IsString } from 'class-validator';

export class LobbyChatDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
