/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  app.enableCors({
    credentials: true,
    origin:[
      "http://localhost:4200",
      "http://localhost:4200/",
      "http://127.0.0.1:4200",
      "http://127.0.0.1:4200/",
      "http://178.170.192.87:3000",
      "http://178.170.192.87:3000/",
      "https://adera-team.ru",
      "http://adera-team.ru",
      "https://adera-team.ru/",
      "http://adera-team.ru/",
      "https://www.adera-team.ru/",
      "http://www.adera-team.ru/",
      "https://www.adera-team.ru",
      "http://www.adera-team.ru",
      "https://profilum.adera-team.ru/",
      "http://profilum.adera-team.ru/",
      "https://profilum.adera-team.ru",
      "http://profilum.adera-team.ru",
    ]
  })
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
