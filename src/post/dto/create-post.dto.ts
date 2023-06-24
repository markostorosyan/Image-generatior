import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Lorem' })
  @IsString()
  @Length(1, 40)
  title: string;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsString()
  @Length(10, 50)
  content: string;
}
