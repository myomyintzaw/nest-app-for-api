import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';

@Controller('cats')
export class CatsController {
  //Dependency Injection
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string[] {
    return this.catsService.findAll();
  }

  //@Req Vs @Body
  //@Req: access the entire request object
  //@Body: access only the body of the request

  @Get('/:id')
  findOne(@Param('id') id: string): string {
    return this.catsService.findOne(+id);
  }

  @Post()
  create(@Body() createCatDto: CreateCatsDto) {
    console.log('createCatDto', createCatDto);
    return this.catsService.create(createCatDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatsDto): string {
    if (!updateCatDto.name) {
      throw new Error('Name is required');
    }
    return this.catsService.update(+id, { name: updateCatDto.name });
  }

  @Delete('/:id')
  delete(@Param('id') id: number): string[] {
    return this.catsService.delete(id);
  }
}
