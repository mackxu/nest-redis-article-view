import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
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

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return this.entityManager.findOneBy(Article, {
      id,
    });
  }
  async addViews(id: number, userId: number) {
    console.log(userId, 'userId');
    const articleKey = `article:${id}`;
    // 从redis中读取数据
    let articleRedisRes = await this.redisService.hashGet(articleKey);
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

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
