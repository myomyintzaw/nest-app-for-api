import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public';

//*? prefix/api/v1/auth/login(post)

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signIn(CreateUserDto.email, CreateUserDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'hello from login user';
  }
}
