import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Request, Response } from 'express';

import { CustomLogger } from '../logger/custom-logger.service';

@Catch(
  Error.CastError,
  Error.DivergentArrayError,
  Error.DocumentNotFoundError,
  Error.MissingSchemaError,
  Error.MongooseServerSelectionError,
  Error.OverwriteModelError,
  Error.ParallelSaveError,
  Error.StrictModeError,
  Error.ValidationError,
  Error.ValidatorError,
  Error.VersionError,
)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private customLogger: CustomLogger) {
    this.customLogger.setContext(MongoExceptionFilter.name);
  }

  catch(
    exception:
      | Error.CastError
      | Error.DivergentArrayError
      | Error.DocumentNotFoundError
      | Error.MissingSchemaError
      | Error.MongooseServerSelectionError
      | Error.OverwriteModelError
      | Error.ParallelSaveError
      | Error.StrictModeError
      | Error.ValidationError
      | Error.ValidatorError
      | Error.VersionError,
    host: ArgumentsHost,
  ) {
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
    console.log('is here');
    this.customLogger.error(errorDetail);
    return response.status(status).json(errorDetail);
  }
}
