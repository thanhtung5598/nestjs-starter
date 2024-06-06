import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { CatsService } from 'src/services/cats/cats.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto) {
    this.catsService.createCat({
      id: uuidv4(),
      ...createCatDto,
    });
  }

  @Get()
  async getAllCats() {
    return this.catsService.findAllCats();
  }

  @Get('/error')
  async getError() {
    throw new ForbiddenException();
  }

  @Get('/params/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.catsService.findOne(id);
  }

  @Get('/query')
  async findOneQuery(@Query('id', ParseUUIDPipe) id: string) {
    return this.catsService.findOne(id);
  }
}
