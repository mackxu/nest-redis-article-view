import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, comment: '文章标题' })
  title: string;
  @Column({ length: 50, comment: '文章描述', nullable: true })
  description: string;
  @Column({ comment: '文章内容', type: 'text' })
  content: string;
  @Column({ comment: '阅读量', default: 0 })
  viewCount: number;
  @Column({ comment: '点赞量', default: 0 })
  likeCount: number;
  @Column({ comment: '收藏量', default: 0 })
  collectCount: number;
}
