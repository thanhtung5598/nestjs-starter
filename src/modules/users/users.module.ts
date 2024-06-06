import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users/users.controller';
import { UsersService } from 'src/services/users/users.service';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
