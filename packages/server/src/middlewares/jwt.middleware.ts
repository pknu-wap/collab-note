import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { clearTokenCookie } from '~/lib/cookies';
import { AuthService } from '~/modules/auth/auth.service';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    req.user = null;

    const token = req?.cookies?.access_token;

    if (!token) {
      return next();
    }

    try {
      const decoded = await this.authService.verifyToken(token);

      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });
      if (!user) throw new HttpException('User not found', 404);

      req.user = {
        userId: decoded.userId,
        username: decoded.username,
      };
    } catch (e) {
      clearTokenCookie(res);
      console.error(e);
    }

    return next();
  }
}
