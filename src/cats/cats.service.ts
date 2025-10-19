import { CreateCatsDto } from './dto/create-cats.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatsEntity } from './entity/cats.entity';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';
import { InjectRepository } from '@nestjs/typeorm';

//nest g service cats

@Injectable()
export class CatsService {
  // private readonly cats: string[] = ['cat1', 'cat2', 'cat3'];
  constructor(
    @InjectRepository(CatsEntity)
    private readonly catsRepository: Repository<CatsEntity>,
  ) {}

  findAll(): Promise<CatsEntity[]> {
    return this.catsRepository.find(); //return array
  }
  findOne(id: number): Promise<CatsEntity | null> {
    return this.catsRepository.findOneBy({ id }); //return object or null
  }
  create(createCatDto: CreateCatsDto) {
    return this.catsRepository.save(createCatDto); //return object
  }
  update(id: string, updateCatDto: UpdateCatsDto): Promise<UpdateResult> {
    return this.catsRepository.update(+id, updateCatDto); //return UpdateResult
  }
  delete(id: number): Promise<DeleteResult> {
    return this.catsRepository.delete(id); //return DeleteResult
  }
}
