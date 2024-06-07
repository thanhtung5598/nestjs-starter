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
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from 'src/@types/dto/create-cat.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CatsService } from 'src/services/cats/cats.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createCat(@Body() createCatDto: CreateCatDto) {
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
