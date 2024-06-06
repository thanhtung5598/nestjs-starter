import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from 'src/services/cats/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto) {
    this.catsService.createCat(createCatDto);
  }

  @Get()
  async getAllCats() {
    return this.catsService.findAllCats();
  }
}
