import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { APP_GUARD, APP_INTERCEPTOR, ModuleRef } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrdersModule } from './orders/orders.module';
import { SSEModule } from './modules/sse/sse.module';
import { AuthModule } from './security/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './security/auth/constants';
import { AuthGuard } from './security/auth/guards/auth.guard';
import { RolesGuard } from './security/users/roles/roles.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CustomCacheInterceptor } from './Interceptors/custom-cache.interceptor';
import { UsersModule } from './security/users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, //the time to live in milliseconds
        limit: 10,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),
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
    PrismaModule,
    ArticlesModule,
    OrdersModule,
    SSEModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    // Lazy load the LazyModule
    const { LazyModule } = await import('./lazy/lazy.module');
    this.moduleRef.create(LazyModule);
  }
}
