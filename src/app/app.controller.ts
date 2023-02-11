import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExcludeController,
} from '@nestjs/swagger';

import { CustomLogger } from '../common/logger/custom-logger.service';
import { AppService } from './app.service';

@ApiTags('App')
@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.setContext(AppController.name);
  }

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
    const methodName = this.getData.name;
    this.customLogger.log(`[${methodName}] Init`);
    return this.appService.getData();
  }
}
