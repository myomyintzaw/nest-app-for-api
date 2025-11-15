import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositary: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const roles = await this.roleRepository.findBy({
      id: In(createUserDto.roleIds),
    });
    const payload: Partial<UserEntity> = {
      ...createUserDto,
      roles,
    };
    return this.userRepositary.save(payload);
  }

  findAll() {
    const allUsers = this.userRepositary.find({
      relations: {
        profile: true,
        posts: true,
      },
    });
    allUsers
      .then((users) => {
        console.log('users', users);
        users.forEach((user) => {
          console.log('User_Profile', user.profile);
          console.log('user_post', user?.posts);
          user?.posts.forEach((post) => {
            console.log('post', post);
            // console.log('Post_User', post.user);
          });
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
    console.log('allUsers', allUsers);

    return this.userRepositary.find({
      relations: {
        profile: true,
        posts: true,
      },
    });
  }

  findOne(id: number) {
    return this.userRepositary.findOne({
      where: { id },
      relations: { profile: true, posts: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepositary.update(id, updateUserDto);
  }

  // async
  remove(id: number) {
    //delete profile first
    // const user = await this.userRepositary.findOne({
    //   where: { id },
    //   relations: { profile: true },
    // });

    // if (!user) {
    //   throw new Error('User not found');
    // }
    // if (user.profile) {
    //   await this.profileRepository.delete(user.profile.id);
    // }
    //then delete user
    return this.userRepositary.delete(id);
  }

  findOneByEmail(email: string) {
    return this.userRepositary.findOne({
      where: { email },
      relations: { profile: true },
    });
  }
}
