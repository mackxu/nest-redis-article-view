import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redis: Redis;

  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
      return;
    }
    await this.redis.set(key, value);
  }

  async hashGet(key: string) {
    // 获取所有字段和值
    // 可能有性能问题
    return await this.redis.hgetall(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    // obj 需要Map类型？
    await this.redis.hmset(key, obj);
    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }
}
