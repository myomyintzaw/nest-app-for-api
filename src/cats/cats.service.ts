import { Injectable } from '@nestjs/common';

//nest g service cats

@Injectable()
export class CatsService {
  private readonly cats: string[] = ['cat1', 'cat2', 'cat3'];
  findAll(): string[] {
    return this.cats;
  }
  findOne(id: number): string {
    return this.cats[id];
  }
  create(data: { name: string }): number {
    return this.cats.push(data.name);
  }
  update(id: number, data: { name: string }): string {
    this.cats[id] = data.name;
    return this.cats[id];
  }
  delete(id: number): string[] {
    this.cats.splice(id, 1);
    return this.cats;
  }
}
