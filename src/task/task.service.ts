import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private readonly articleService: ArticleService;

  @Cron(CronExpression.EVERY_MINUTE)
  async syncViews() {
    console.log('syncViews start');
    await this.articleService.flushRedisToMysql();
  }
}
