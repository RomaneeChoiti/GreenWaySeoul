import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';
import { Request, Response } from 'express';

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

  @Get('/refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user);
  }

  @Patch('/me')
  @UseGuards(AuthGuard())
  editProfile(@Body() editProfileDto: EditProfileDto, @GetUser() user: User) {
    return this.authService.editProfile(editProfileDto, user);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: User) {
    return this.authService.deleteRefreshToken(user);
  }

  @Delete('/me')
  @UseGuards(AuthGuard())
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user);
  }

  @Patch('/category')
  @UseGuards(AuthGuard())
  updateCategory(
    @Body() categories: Record<keyof MarkerColor, string>,
    @GetUser() user: User,
  ) {
    return this.authService.updateCategory(categories, user);
  }

  @Get('/oauth/kakao')
  handleKakaoRedirect(@Req() req: Request, @Res() res: Response) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.type('html'); // Explicitly set Content-Type to text/html
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Kakao Login Redirect</title></head>
        <body>
          <script>
            window.ReactNativeWebView?.postMessage(${JSON.stringify(fullUrl)});
          </script>
          <p>로그인 중입니다... 앱으로 돌아가는 중</p>
        </body>
      </html>
    `);
  }

  @Post('/oauth/kakao')
  kakaoLogin(@Body() kakaoToken: { token: string }) {
    return this.authService.kakaoLogin(kakaoToken);
  }

  @Post('/oauth/apple')
  appleLogin(
    @Body()
    appleIdentity: {
      identityToken: string;
      appId: string;
      nickname: string | null;
    },
  ) {
    return this.authService.appleLogin(appleIdentity);
  }
}
