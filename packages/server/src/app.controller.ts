import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators';

@Public()
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "This is CollabNote's API Server!";
  }
}
