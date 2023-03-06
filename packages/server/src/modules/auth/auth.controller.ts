import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUser, Public } from '~/common/decorators';
import { GithubGuard } from '~/common/guards';
import { clearTokenCookie, setTokenCookie } from '~/lib/cookies';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('github')
  @UseGuards(GithubGuard)
  loginWithGithub(): string {
    return 'Login with Github';
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(
    @Res() res: Response,
    @GetCurrentUser()
    { userId, username }: { userId: number; username: string },
  ): Promise<void> {
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
    const token = await this.authService.generateToken(userId, username);
    setTokenCookie(res, token);
    return res.redirect(`${FRONTEND_URL}`);
  }

  @Delete('logout')
  logout(@Res() res: Response) {
    clearTokenCookie(res);
    return res.status(200).json({ message: 'Logout success' });
  }
}
