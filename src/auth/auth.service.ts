import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException({
        message: `User with email: ${email} not exists`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;

      return result;
    }

    throw new BadRequestException({ message: 'Password is wrong' });
  }

  async login(user: LoginDto) {
    const exist = await this.validateUser(user.email, user.password);

    if (!exist) {
      throw new BadRequestException({ message: 'Wrong credentials!' });
    }

    const payload = { email: exist.email, id: exist.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
