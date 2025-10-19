import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats')
export class CatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
