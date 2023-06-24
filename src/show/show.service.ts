import { Injectable } from '@nestjs/common';
import { PostService } from 'src/post/post.service';

@Injectable()
export class ShowService {
  constructor(private postService: PostService) {}

  getImage(id: number) {
    return this.postService.findForImage(id);
  }
}
