import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EnvConfig } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/aurh.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      cache: true,
    }),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
