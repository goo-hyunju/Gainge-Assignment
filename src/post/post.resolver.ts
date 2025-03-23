import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post)
  async post(@Args('id') id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput): Promise<Post> {
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Post)
  async updatePost(@Args('id') id: number, @Args('input') input: UpdatePostInput): Promise<Post> {
    const post = { ...input, id } as Post;
    return this.postService.update(id, post);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: number): Promise<boolean> {
    await this.postService.remove(id);
    return true;
  }
}
