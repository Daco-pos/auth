import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.http.port');
  const host = configService.get<string>('app.http.host');
  const globalPrefix = configService.get<string>('app.globalPrefix');
  const versioningPrefix = configService.get<string>('app.versioning.prefix');
  const version = configService.get<string>('app.versioning.version');
  const versionEnable = configService.get<string>('app.versioning.enable');
  app.useGlobalPipes(new ValidationPipe());

  if (!globalPrefix) {
    throw new Error('No Global prefix provided in configuration');
  } else if (!port) {
    throw new Error('No port provided in configuration');
  } else if (!host) {
    throw new Error('No host provided in configuration');
  }
  app.setGlobalPrefix(globalPrefix);
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  setupSwagger(app);
  await app.listen(port, host);
  logger.log(
    `🚀 ${configService.get(
      'app.name',
    )} service started successfully on port ${port}`,
  );
}
bootstrap();
