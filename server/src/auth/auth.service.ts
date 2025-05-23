import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async signup(authDto: AuthDto) {
    const { email, password } = authDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error saving user:', error);
      if (error.code === '23505') {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      throw new InternalServerErrorException('회원가입 중 오류가 발생했습니다.');
    }
  }
}
