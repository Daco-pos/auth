import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { PrismaService } from './core/services/prisma.service';
import { TerminusModule } from '@nestjs/terminus';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from './common/common.module';
import { UserModule } from './modules/user/user.module';
import { AuthService } from './modules/auth/services/auth.service';
import { HelperHashService } from './modules/auth/services/helper.hash.service';
@Module({
  imports: [
    CoreModule,
    CommonModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, JwtService, AuthService, HelperHashService],
})
export class AppModule {}
