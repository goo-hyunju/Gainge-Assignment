import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from "./app.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { PostCommentModule } from './post-comment/post-comment.module';

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
          path: 'test',
          driver: ApolloDriver,
          autoSchemaFile: true,
          playground: false,
          cache: 'bounded',
          context: ({ req, res }) => {
            return { req, res };
          },
          plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: true })],
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'gainge_assignment',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      PostModule,
      PostCommentModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
