import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }) //specify inverse side as a second parameter

  // @JoinColumn()
  // @JoinColumn({name:'profile_id'})
  profile: ProfileEntity;
}
