import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostComment } from './post-comment.entity';
import { CreatePostCommentInput } from './dto/create-post-comment.input';
import { UpdatePostCommentInput } from './dto/update-post-comment.input';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private readonly postCommentRepository: Repository<PostComment>,
  ) {}

  async findAll(): Promise<PostComment[]> {
    return this.postCommentRepository.find();
  }

  async findByPostId(postId: number): Promise<PostComment[]> {
    return this.postCommentRepository.find({ where: { postId } }); // postId 사용
  }
  
  async findOne(id: number): Promise<PostComment> {
    const postComment = await this.postCommentRepository.findOneBy({ id });
    if (!postComment) {
      throw new Error(`PostComment with id ${id} not found`);
    }
    return postComment;
  }

  async create(createPostCommentInput: CreatePostCommentInput): Promise<PostComment> {
    const postComment = this.postCommentRepository.create(createPostCommentInput);
    return this.postCommentRepository.save(postComment);
  }

  async update(id: number, updatePostCommentInput: UpdatePostCommentInput): Promise<PostComment> {
    await this.postCommentRepository.update(id, updatePostCommentInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postCommentRepository.delete(id);
  }
}
