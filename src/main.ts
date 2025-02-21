import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  app.use(
    session({
      secret: 'duoduoxu',
      resave: false,
      saveUninitialized: false,
      // cookie: {
      //   secure: true,
      // },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
