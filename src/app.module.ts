import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { RedisModule } from './redis/redis.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, ArticleModule, RedisModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
