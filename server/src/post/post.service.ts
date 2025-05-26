import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/auth/user.entity';

/*
    service란
    비즈니스 로직을 처리하는 역할을 하는 클래스입니다.
    데이터베이스와의 상호작용, 데이터 처리 등을 담당합니다.
*/

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async getAllMarkers(user: User) {
    try {
      return this.postRepository
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId: user.id })
        .select(['post.latitude', 'post.longitude', 'post.type'])
        .getMany();
    } catch (error) {
      console.error('Error fetching markers:', error);
      throw new InternalServerErrorException('마커 조회에 실패했습니다.');
    }
  }

  async getPosts(page: number, user: User) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId: user.id })
      .orderBy('post.date', 'DESC')
      .take(perPage)
      .skip(offset)
      .getMany();
  }

  async getPostById(id: number, user: User) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.userId = :userId', { userId: user.id })
        .andWhere('post.id = :id', { id })
        .getOne();
      if (!foundPost) {
        throw new NotFoundException('게시물을 찾을 수 없습니다.');
      }
      return foundPost;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new InternalServerErrorException('게시물 조회에 실패했습니다.');
    }
  }

  async createPost(createPostDto: CreatePostDto, user: User) {
    const { latitude, longitude, type, address, title, description, date, score, time, imageUris } =
      createPostDto;

    const post = this.postRepository.create({
      latitude,
      longitude,
      type,
      address,
      title,
      description,
      date,
      score,
      time,
      user,
    });

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new InternalServerErrorException('게시물 저장에 실패했습니다.');
    }

    const { user: _, ...postWithoutUser } = post; // user 정보 제외

    return postWithoutUser;
  }

  async deletePost(id: number, user: User) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .from(Post)
        .where('userId = :userId', { userId: user.id })
        .andWhere('id = :id', { id })
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException('게시물을 찾을 수 없습니다.');
      }
      return id;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new InternalServerErrorException('게시물 삭제에 실패했습니다.');
    }
  }

  async updatePost(
    id: number,
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address' | 'time'>,
    user: User
  ) {
    const post = await this.getPostById(id, user);
    const { title, description, score, imageUris } = updatePostDto;
    post.title = title;
    post.description = description;
    post.score = score;

    // image module
    // post.imageUris = imageUris;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new InternalServerErrorException('게시물 저장에 실패했습니다.');
    }
    return post;
  }
}
