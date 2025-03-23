import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostCommentInput {
  @Field(() => Int)
  postId!: number;

  @Field()
  authorId!: string;

  @Field()
  authorPassword!: string;

  @Field()
  content!: string;
}
