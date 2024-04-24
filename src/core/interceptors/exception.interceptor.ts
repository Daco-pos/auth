import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { errorKeys, isDev } from 'src/utils/constants';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  async catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessageKey =
      exception instanceof HttpException
        ? exception.message
        : 'error.internalServerError';
    const message = errorKeys[errorMessageKey];

    if (isDev && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    const errorResponse = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };

    if (isDev || statusCode !== HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Error: ${JSON.stringify(errorResponse)}`);
    }

    response.status(statusCode).json(errorResponse);
  }
}
