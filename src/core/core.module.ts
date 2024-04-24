import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './services/prisma.service';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
  controllers: [],
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})

export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
