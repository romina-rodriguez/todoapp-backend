import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns a welcome message',
  })
  @ApiResponse({
    status: 200,
    description: 'Shows user a welcome message',
    type: Object,
  })
  getData() {
    return this.appService.getData();
  }
}
