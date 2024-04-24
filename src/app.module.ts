import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configs from './config';
import { CoreModule } from './core/core.module';
import { PrismaService } from './core/services/prisma.service';
import { TerminusModule } from '@nestjs/terminus';
@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
