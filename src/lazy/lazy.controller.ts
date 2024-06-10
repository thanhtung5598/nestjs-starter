import { Controller, Get } from '@nestjs/common';
import { LazyService } from './lazy.service';

@Controller('lazy')
export class LazyController {
  constructor(private readonly lazyService: LazyService) {}

  @Get()
  getHello(): string {
    return this.lazyService.getHello();
  }
}
