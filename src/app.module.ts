import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { RedisModule } from './redis/redis.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    ArticleModule,
    RedisModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'duoduoxu!',
      database: 'article_views',
      synchronize: true,
      logging: true,
      entities: [User, Article],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
