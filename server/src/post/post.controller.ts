import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

/*
    controller란
    요청을 처리하고 응답을 반환하는 역할을 하는 클래스입니다.
*/

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  getPosts() {
    return this.postService.getPosts();
  }
}
