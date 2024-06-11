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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards (ký tự đại diện)
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
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
    OrdersModule,
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
