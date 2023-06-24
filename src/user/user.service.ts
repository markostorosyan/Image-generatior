import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.findByEmail(createUserDto.email);

    if (userExist) {
      throw new BadRequestException({
        message: `Email already in use`,
      });
    }

    const user: UserEntity = new UserEntity();

    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException({
        message: `User whit email: ${email} not found`,
      });
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException({
        message: `User whit id: ${id} not found`,
      });
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException({
        message: `User whit id: ${id} not found`,
      });
    }

    if (user.hasOwnProperty('firstname')) {
      user.firstname = updateUserDto.firstname;
    }
    if (user.hasOwnProperty('lastname')) {
      user.lastname = updateUserDto.lastname;
    }
    if (user.hasOwnProperty('email')) {
      user.email = updateUserDto.email;
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException({
        message: `User whit id: ${id} not found`,
      });
    }

    return this.userRepository.delete(id);
  }
}
