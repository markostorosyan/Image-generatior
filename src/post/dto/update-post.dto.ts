import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'Lorem' })
  @IsString()
  @Length(1, 40)
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Lorem Ipsum' })
  @IsString()
  @Length(10, 50)
  @IsOptional()
  content: string;
}
