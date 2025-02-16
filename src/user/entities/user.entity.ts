import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, comment: '用户名' })
  username: string;
  @Column({ length: 30, comment: '密码' })
  password: string;
}
