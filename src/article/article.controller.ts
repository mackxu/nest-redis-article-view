import { Controller, Get, Param, Session } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Get(':id/views')
  async addViews(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
  ) {
    return this.articleService.addViews(+id, session?.user?.id);
  }
}
