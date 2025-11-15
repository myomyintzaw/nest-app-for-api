import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'This is required' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsString({ message: 'User must be a string' })
  @IsNotEmpty({ message: 'User is required' })
  userId: number;

  @IsString({ message: 'User must be a string' })
  // @IsNotEmpty({ message: 'User is required' })
  user?: UserEntity;
}
