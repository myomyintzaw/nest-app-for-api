import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bio: string;
  @Column()
  age: number;
  @Column()
  gender: string;

  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  profilePicture: string;
}
