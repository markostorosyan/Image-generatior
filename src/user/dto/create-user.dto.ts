import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Useryan' })
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password1!' })
  @IsString()
  @Length(6, 50)
  password: string;
}
