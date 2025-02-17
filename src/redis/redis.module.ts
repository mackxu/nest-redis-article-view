import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => new Redis(),
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
