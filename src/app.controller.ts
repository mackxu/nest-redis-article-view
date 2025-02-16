import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'zhangsan',
      password: '123456',
    });
    await this.entityManager.save(User, {
      username: 'lisi',
      password: '123456',
    });
    await this.entityManager.save(Article, {
      title: '第一篇文章',
      description: '第一篇文章的描述',
      content: '第一篇文章的内容',
    });
    await this.entityManager.save(Article, {
      title: '第二篇文章',
      description: '第二篇文章的描述',
      content: '第二篇文章的内容',
    });
    await this.entityManager.save(Article, {
      title: '第三篇文章',
      description: '第三篇文章的描述',
      content: '第三篇文章的内容',
    });
    return '初始化数据成功';
  }
}
