import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonExceptionFilter, HttpExceptionFilter } from './common/exception/filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CommonExceptionFilter(), new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
