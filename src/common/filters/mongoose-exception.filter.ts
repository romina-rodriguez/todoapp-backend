import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Request, Response } from 'express';

import { CustomLogger } from '../logger/custom-logger.service';

@Catch(Error)
@Injectable()
export class MongooseExceptionFilter implements ExceptionFilter {
  constructor(private customLogger: CustomLogger) {
    this.customLogger.setContext(MongooseExceptionFilter.name);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorDetail = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: `Mongoose ${exception.name}`,
      path: request.url,
      method: request.method,
      detail: exception.message,
    };

    this.customLogger.error(JSON.stringify(errorDetail, null, 6));
    response.status(status).json(errorDetail);
  }
}
