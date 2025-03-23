import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostComment } from '../post-comment/post-comment.entity';

@ObjectType()
@Entity('post')
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ name: 'author_id' })
  authorId!: string;

  @Field()
  @Column({ name: 'author_password' })
  authorPassword!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  content!: string;

  @Field(() => [PostComment], { nullable: 'items' })
  @OneToMany(() => PostComment, (comment) => comment.post, { cascade: true })
  comments!: PostComment[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
