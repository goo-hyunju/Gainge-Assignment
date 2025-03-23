import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../post/post.entity';

@ObjectType()
@Entity('postcomment')
export class PostComment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column({ name: 'post_id' })  // 데이터베이스의 post_id와 매핑
  postId!: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post!: Post;

  @Field()
  @Column({ name: 'author_id' })
  authorId!: string;

  @Field()
  @Column({ name: 'author_password' })
  authorPassword!: string;

  @Field()
  @Column()
  content!: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
