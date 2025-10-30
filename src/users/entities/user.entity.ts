import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user) //specify inverse side as a second parameter
  @JoinColumn()
  profile: ProfileEntity;
}
