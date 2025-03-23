import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  authorId!: string;

  @Field()
  @IsString()
  authorPassword!: string;

  @Field()
  @IsString()
  title!: string;

  @Field({ nullable: true })
  content?: string;
}
