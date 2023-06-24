import { Module } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
