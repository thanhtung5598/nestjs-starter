import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
})
export class AppModule {}
