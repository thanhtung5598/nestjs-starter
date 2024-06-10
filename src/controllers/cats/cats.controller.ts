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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from 'src/@types/dto/create-cat.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
// import { Roles } from 'src/guard/roles.decorator';s
import { RolesGuard } from 'src/guard/roles.guard';
import { LoggingInterceptor } from 'src/Interceptors/logging.interceptor';
import { LazyService } from 'src/lazy/lazy.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CatsService } from 'src/services/cats/cats.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard) // or @UseGuards(new RolesGuard())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  private lazyService: LazyService;

  constructor(private catsService: CatsService) {}

  @Get('lazy-hello')
  async getLazyHello(): Promise<string> {
    if (!this.lazyService) {
      const { LazyService } = await import('../../lazy/lazy.service');
      this.lazyService = new LazyService();
    }
    return this.lazyService.getHello();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  // @Roles(['admin'])
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
