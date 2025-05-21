import { Injectable } from '@nestjs/common';

/*
    service란
    비즈니스 로직을 처리하는 역할을 하는 클래스입니다.
    데이터베이스와의 상호작용, 데이터 처리 등을 담당합니다.
*/

@Injectable()
export class PostService {
  getPosts() {
    return ['apple', 'banana'];
  }
}
