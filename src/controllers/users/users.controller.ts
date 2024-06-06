import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/services/cats/cats.service';
import { LoggerService } from 'src/services/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly catsService: CatsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('/logger')
  getLogger(): string {
    this.loggerService.log('Hello World endpoint was called');
    return 'Hello logger';
  }

  @Get()
  findAllCat() {
    return this.catsService.findAllCats();
  }
}
