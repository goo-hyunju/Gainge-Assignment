import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  authorId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  authorPassword?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;
}
