import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginType: 'email' | 'kakao' | 'apple';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  kakaoImageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => Post, (post) => post.user, { eager: false })
  post: Post[];
}
