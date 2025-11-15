import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
  }) //specify inverse side as a second parameter
  @JoinColumn({ name: 'user_id' })
  //   @OneToOne(() => UserEntity, (user) => user.profile, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  user: UserEntity;
}
