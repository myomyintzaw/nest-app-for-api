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
  // nest g service cats
  //Dependency Injection
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll(); //return array
  }

  //@Req Vs @Body
  //@Req: access the entire request object
  //@Body: access only the body of the request

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id); //return object or null
  }

  @Post()
  create(@Body() createCatDto: CreateCatsDto) {
    console.log('createCatDto', createCatDto);
    return this.catsService.create(createCatDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatsDto) {
    // if (!updateCatDto.name) {
    //   throw new Error('Name is required');
    // }
    // { name: updateCatDto.name }

    return this.catsService.update(id, updateCatDto); //return UpdateResult
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.catsService.delete(id); //return DeleteResult
  }
}
