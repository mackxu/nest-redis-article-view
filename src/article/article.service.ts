import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  findOne(id: number) {
    return this.entityManager.findOneBy(Article, {
      id,
    });
  }
  async addViews(id: number, userId: number) {
    if (!userId) {
      throw new BadRequestException('用户未登录');
    }
    const articleAndUserKey = `article:${id}:user:${userId}`;
    const viewed = await this.redisService.get(articleAndUserKey);

    const articleKey = `article:${id}`;
    // 从redis中读取数据
    let articleRedisRes = await this.redisService.hashGet(articleKey);
    if (viewed) {
      return +articleRedisRes.viewCount;
    }

    // 设置标记，有效时间为10秒
    await this.redisService.set(articleAndUserKey, 1, 10);
    if (articleRedisRes.viewCount === undefined) {
      const article = await this.findOne(id);
      if (!article) {
        throw new BadRequestException('文章不存在');
      }
      // 从数据库中读取数据
      articleRedisRes = {
        ...articleRedisRes,
        viewCount: String(article.viewCount),
        likeCount: String(article.likeCount),
        collectCount: String(article.collectCount),
      };
    }
    const viewCount = +articleRedisRes.viewCount + 1;
    await this.redisService.hashSet(articleKey, {
      ...articleRedisRes,
      viewCount,
    });
    return viewCount;
  }

  async flushRedisToMysql() {
    const keys = await this.redisService.keys('article:*');
    for (const key of keys) {
      const articleId = key.split(':')[1];
      const articleRedisRes = await this.redisService.hashGet(key);
      await this.entityManager.update(
        Article,
        {
          id: +articleId,
        },
        {
          viewCount: +articleRedisRes.viewCount,
          likeCount: +articleRedisRes.likeCount,
          collectCount: +articleRedisRes.collectCount,
        },
      );
    }
  }
}
