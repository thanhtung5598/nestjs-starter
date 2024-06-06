import { Global, Module } from '@nestjs/common';
import { CatsController } from 'src/controllers/cats/cats.controller';
import { UsersController } from 'src/controllers/users/users.controller';
import { CatsService } from 'src/services/cats/cats.service';
import { UsersService } from 'src/services/users/users.service';
@Global()
@Module({
  controllers: [CatsController, UsersController],
  providers: [CatsService, UsersService],
})
export class CatsModule {}
