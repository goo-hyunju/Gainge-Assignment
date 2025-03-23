import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePostCommentInput } from './create-post-comment.input';

@InputType()
export class UpdatePostCommentInput extends PartialType(CreatePostCommentInput) {
  @Field()
  id!: number;
}
