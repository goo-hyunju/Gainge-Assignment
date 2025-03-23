import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './post-comment.entity';
import { PostCommentService } from './post-comment.service';
import { PostCommentResolver } from './post-comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  providers: [PostCommentService, PostCommentResolver],
})
export class PostCommentModule {}