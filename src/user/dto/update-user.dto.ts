import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'User' })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({ example: 'Useryan' })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;
}
