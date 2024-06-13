import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
  Req,
  UploadedFile,
  // ParseFilePipe,
  // MaxFileSizeValidator,
  // FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  // FilesInterceptor,
} from '@nestjs/platform-express';
import { Roles } from 'src/security/users/roles/roles.decorator';
import { Role } from 'src/security/users/roles/role.enum';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileSingle(
    @UploadedFile(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 300000 }),
      //     new FileTypeValidator({ fileType: 'image/jpeg' }),
      //   ],
      // }), Or
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 300000, // equal to 300kb
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

  @Post('uploadMultiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadFileMultiple(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get('/user')
  findOneUser(@Req() request: Request): UserEntity {
    console.log(request.cookies);

    return new UserEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      _age: 10,
      password: 'password',
    });
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
