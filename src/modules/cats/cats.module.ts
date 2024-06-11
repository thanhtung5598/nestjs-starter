import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CatsController } from 'src/controllers/cats/cats.controller';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { CatsService } from 'src/services/cats/cats.service';
@Module({
  imports: [HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: '/cats', method: RequestMethod.POST })
      .forRoutes({
        path: '/cats',
        method: RequestMethod.GET,
      });
  }
}
