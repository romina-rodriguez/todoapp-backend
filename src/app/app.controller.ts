import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongooseExceptionFilter } from '../filters/mongoose-exception.filter';
import { AppService } from './app.service';

@ApiTags('App')
@UseFilters(MongooseExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
