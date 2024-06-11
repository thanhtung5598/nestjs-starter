import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { APP_INTERCEPTOR, ModuleRef } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 5, // seconds
    }),
    ConfigModule.forRoot(),
    LoggerModule,
    CatsModule,
    UsersModule,
    PrismaModule,
    ArticlesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    // Lazy load the LazyModule
    const { LazyModule } = await import('./lazy/lazy.module');
    this.moduleRef.create(LazyModule);
  }
}
