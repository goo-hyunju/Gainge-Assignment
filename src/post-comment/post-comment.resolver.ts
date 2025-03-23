import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostCommentService } from './post-comment.service';
import { PostComment } from './post-comment.entity';
import { CreatePostCommentInput } from './dto/create-post-comment.input';
import { UpdatePostCommentInput } from './dto/update-post-comment.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => PostComment)
export class PostCommentResolver {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Query(() => [PostComment])
  async postComments(@Args('postId', { type: () => Number }) postId: number): Promise<PostComment[]> {
    if (postId == null) {
      throw new HttpException('postId는 필수입니다.', HttpStatus.BAD_REQUEST);
    }
    return this.postCommentService.findByPostId(postId);
  }

  @Query(() => PostComment)
  async postComment(@Args('id', { type: () => Number }) id: number): Promise<PostComment> {
    const postComment = await this.postCommentService.findOne(id);
    if (!postComment) {
      throw new HttpException(`PostComment with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return postComment;
  }

  @Mutation(() => PostComment)
  async createPostComment(
    @Args('createPostCommentInput') createPostCommentInput: CreatePostCommentInput
  ): Promise<PostComment> {
    if (!createPostCommentInput.postId || !createPostCommentInput.authorId || !createPostCommentInput.content) {
      throw new HttpException('모든 필드가 필수입니다.', HttpStatus.BAD_REQUEST);
    }
    return this.postCommentService.create(createPostCommentInput);
  }

  @Mutation(() => PostComment)
  async updatePostComment(
    @Args('id') id: number,
    @Args('input') input: UpdatePostCommentInput
  ): Promise<PostComment> {
    const postComment = await this.postCommentService.findOne(id);
    if (!postComment) {
      throw new HttpException(`PostComment with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    
    Object.assign(postComment, input);
    return this.postCommentService.update(id, postComment);
  }

  @Mutation(() => Boolean)
  async deletePostComment(@Args('id') id: number): Promise<void> {
    const postComment = await this.postCommentService.findOne(id);
    if (!postComment) {
      throw new HttpException(`PostComment with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.postCommentService.remove(id);
  }
}
