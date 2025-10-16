import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('findOne')
  findOne(): string {
    return 'This action returns a cat';
  }
}
