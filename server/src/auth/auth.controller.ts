import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from 'src/@common/decorator/get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
