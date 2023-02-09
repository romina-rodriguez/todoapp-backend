import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
import { AppService } from './app.service';

@ApiTags('App')
@UseFilters(MongoExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
