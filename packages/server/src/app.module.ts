import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthConfig, EnvConfig, JwtConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule, UsersModule, EventsModule, NotesModule } from './modules';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards';
import { JwtMiddleware } from './middlewares';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, AuthConfig, JwtConfig],
      cache: true,
    }),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
    EventsModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(JwtMiddleware).forRoutes('*');
  }
}
