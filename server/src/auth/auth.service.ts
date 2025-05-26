import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EditProfileDto } from './dto/editProfile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async signup(authDto: AuthDto) {
    const { email, password } = authDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      loginType: 'email', // loginType 값을 명시적으로 설정
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
      throw new InternalServerErrorException('회원가입 중 오류가 발생했습니다.');
    }
  }

  private async getTokens(payload: { email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const { accessToken, refreshToken } = await this.getTokens({ email }); // 유저의 이메일을 사용하여 토큰을 생성하는 로직을 추가합니다.
    await this.updateHashedRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.userRepository.update(id, {
        hashedRefreshToken,
      });
    } catch {
      throw new InternalServerErrorException('리프레시 토큰 업데이트 중 오류가 발생했습니다.');
    }
  }

  async refreshToken(user: User) {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });
    if (!user.hashedRefreshToken) {
      throw new ForbiddenException('로그인 정보가 없습니다.');
    }
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  getProfile(user: User) {
    const { password, hashedRefreshToken, ...rest } = user;
    return { ...rest };
  }

  async editProfile(editProfileDto: EditProfileDto, user: User) {
    const profile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (!profile) {
      throw new ForbiddenException('프로필을 찾을 수 없습니다.');
    }
    const { nickname, imageUrl } = editProfileDto;
    profile.nickname = nickname;
    profile.imageUrl = imageUrl ?? '';

    try {
      await this.userRepository.save(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new InternalServerErrorException('프로필 업데이트 중 오류가 발생했습니다.');
    }
  }

  async deleteRefreshToken(user: User) {
    if (!user.hashedRefreshToken) {
      throw new ForbiddenException('로그인 정보가 없습니다.');
    }
    try {
      await this.userRepository.update(user.id, { hashedRefreshToken: undefined });
    } catch (error) {
      console.error('Error deleting refresh token:', error);
      throw new InternalServerErrorException('리프레시 토큰 삭제 중 오류가 발생했습니다.');
    }
  }

  async deleteAccount(user: User) {
    if (!user.hashedRefreshToken) {
      throw new ForbiddenException('로그인 정보가 없습니다.');
    }
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .delete()
        .from(User)
        .where('id = :id', { id: user.id })
        .execute();
      // await this.deleteRefreshToken(user); // 리프레시 토큰도 삭제
    } catch (error) {
      console.error('Error deleting account:', error);
      throw new BadRequestException('계정 삭제 중 오류가 발생했습니다.');
    }
  }
}
