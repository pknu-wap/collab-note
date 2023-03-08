import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_SECRET: string;
  private readonly ACCESS_TOKEN_DURATION: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.ACCESS_TOKEN_DURATION = this.configService.get<string>(
      'ACCESS_TOKEN.DURATION',
    );
    this.ACCESS_TOKEN_SECRET =
      this.configService.get<string>(`ACCESS_TOKEN.SECRET`);
  }

  async generateToken(userId: number, username: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        userId,
        username,
      },
      {
        secret: this.ACCESS_TOKEN_SECRET,
        expiresIn: this.ACCESS_TOKEN_DURATION,
      },
    );

    return token;
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    const decoded: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: this.ACCESS_TOKEN_SECRET,
    });

    return decoded;
  }
}
