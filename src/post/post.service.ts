import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(userId: number, createPostDto: CreatePostDto) {
    const post: PostEntity = new PostEntity();

    const user = new UserEntity();
    user.id = userId;

    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.user = user;

    return this.postRepository.save(post);
  }

  async findForImage(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException({
        message: `Post whit id: ${id} not found`,
      });
    }

    const final = {
      title: post.title,
      content: post.content,
      author: `${post.user.firstname} ${post.user.lastname}`,
    };

    return final;
  }

  async check(id: number, userId: number, action: string) {
    const post = this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        message: `Post whit id: ${id} not found`,
      });
    }

    const createorId = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (createorId.user.id !== userId) {
      throw new ForbiddenException({
        message: `You can't ${action} this post`,
      });
    }

    return post;
  }

  async update(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const post = await this.check(id, userId, 'update');

    if (post.hasOwnProperty('title')) {
      post.title = updatePostDto.title;
    }
    if (post.hasOwnProperty('content')) {
      post.content = updatePostDto.content;
    }

    return this.postRepository.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.check(id, userId, 'delete');

    return this.postRepository.delete(post.id);
  }
}
