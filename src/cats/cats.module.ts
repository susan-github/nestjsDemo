import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from './../common/middleware/logger.middleware'

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}