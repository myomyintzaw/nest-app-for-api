import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositary: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepositary.save(createUserDto);
  }

  findAll() {
    return this.userRepositary.find({
      relations: {
        profile: true,
      },
    });
  }

  findOne(id: number) {
    return this.userRepositary.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepositary.update(id, updateUserDto);
  }

  async remove(id: number) {
    //delete profile first
    const user = await this.userRepositary.findOne({
      where: { id },
      relations: { profile: true },
    });

    if (!user) {
      throw new Error('User not found');
    }
    if (user.profile) {
      await this.profileRepository.delete(user.profile.id);
    }
    //then delete user
    return this.userRepositary.delete(id);
  }
}
