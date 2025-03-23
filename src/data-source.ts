import { DataSource } from 'typeorm';
import { Post } from './post/post.entity';
import { PostComment } from './post-comment/post-comment.entity';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'test',
//   database: 'test',
//   entities: [Post, PostComment],
//   synchronize: true,
//   logging: false,
// });
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'gainge_assignment',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/../../../dist/*.js'], // dist 폴더의 모든 .js 파일
  // migrations: [__dirname + '/../dist/*.js'], // dist 폴더 내의 모든 .js 파일
  migrations: [__dirname + '/../1742692170370-UpdateAuthorIdColumn.js'],
  synchronize: false,
});

