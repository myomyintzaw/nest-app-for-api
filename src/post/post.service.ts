import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    // return this.postRepository.save(createPostDto);
    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new Error('User not found');
      }
      createPostDto.user = user; //** Assign the user entity to the post
    }
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    // return this.postRepository.findOneBy({ id });
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
