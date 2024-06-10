import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { ModuleRef } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    CatsModule,
    UsersModule,
    PrismaModule,
    ArticlesModule,
  ],
})
export class AppModule {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    // Lazy load the LazyModule
    const { LazyModule } = await import('src/lazy/lazy.module');
    this.moduleRef.create(LazyModule);
  }
}
