import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => UserEntity, (user) => user.profile) //specify inverse side as a second parameter
  user: UserEntity;
}
