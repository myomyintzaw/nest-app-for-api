import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.profileRepository.save(createProfileDto);
  }

  findAll() {
    return this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
