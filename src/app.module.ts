import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    LoggerModule,
    CatsModule,
    UsersModule,
    PrismaModule,
    ArticlesModule,
  ],
})
export class AppModule {}
