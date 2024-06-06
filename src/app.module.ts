import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [LoggerModule, CatsModule, UsersModule],
})
export class AppModule {}
