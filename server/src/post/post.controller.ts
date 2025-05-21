import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

/*
    controller란
    요청을 처리하고 응답을 반환하는 역할을 하는 클래스입니다.
*/

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  getPosts(@Query('page') page: number) {
    return this.postService.getPosts(page);
  }

  @Post('/posts')
  createPost(@Body() cratePostDto: CreatePostDto) {
    return this.postService.createPost(cratePostDto);
  }
}
