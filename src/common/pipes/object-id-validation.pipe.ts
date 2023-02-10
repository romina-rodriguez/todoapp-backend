import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

import { CustomLogger } from '../logger/custom-logger.service';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  constructor(private customLogger: CustomLogger) {
    this.customLogger.setContext(ObjectIdValidationPipe.name);
  }
  transform(value: string) {
    if (!isValidObjectId(value)) {
      const badRequestException = new BadRequestException(
        `The given id "${value}" is not a valid Mongo ObjectId`,
      );
      this.customLogger.error(badRequestException.message);
      throw badRequestException;
    }
    return value;
  }
}
