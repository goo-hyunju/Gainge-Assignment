import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../src/post/post.entity';
import { PostComment } from '../src/post-comment/post-comment.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let postRepository: Repository<Post>;
  let postCommentRepository: Repository<PostComment>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    postRepository = moduleFixture.get<Repository<Post>>(getRepositoryToken(Post));
    postCommentRepository = moduleFixture.get<Repository<PostComment>>(getRepositoryToken(PostComment));
    await app.init();
  });

  beforeEach(async () => {
    await postCommentRepository.clear();
    await postRepository.clear();
    await postRepository.save({
      authorId: 'author1',
      authorPassword: 'password1',
      title: 'First Post',
      content: 'This is the content of the first post.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('GraphQL - posts query', () => {
    return request(app.getHttpServer())
      .post('/test')
      .send({
        query: `
          query {
            posts {
              id
              authorId
              authorPassword
              title
              content
              createdAt
              updatedAt
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.posts).toBeDefined();
      });
  });

  it('GraphQL - createPost mutation', () => {
    return request(app.getHttpServer())
      .post('/test')
      .send({
        query: `
          mutation {
            createPost(createPostInput: {
              authorId: "author3",
              authorPassword: "password3",
              title: "Third Post",
              content: "This is the content of the third post."
            }) {
              id
              authorId
              authorPassword
              title
              content
              createdAt
              updatedAt
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPost).toBeDefined();
      });
  });

  it('GraphQL - updatePost mutation', () => {
    return request(app.getHttpServer())
      .post('/test')
      .send({
        query: `
          mutation {
            updatePost(id: 1, input: {
              authorId: "author1",
              authorPassword: "password1",
              title: "Updated First Post",
              content: "This is the updated content of the first post."
            }) {
              id
              authorId
              authorPassword
              title
              content
              createdAt
              updatedAt
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updatePost).toBeDefined();
      });
  });

  it('GraphQL - deletePost mutation', () => {
    return request(app.getHttpServer())
      .post('/test')
      .send({
        query: `
          mutation {
            deletePost(id: 1)
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletePost).toBe(true);
      });
  });
});
