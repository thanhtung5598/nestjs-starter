import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/services/cats/cats.service';

@Controller('users')
export class UsersController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAllCat() {
    return this.catsService.findAllCats();
  }
}
