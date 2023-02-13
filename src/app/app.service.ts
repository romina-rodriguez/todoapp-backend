import { Injectable } from '@nestjs/common';

import { CustomLogger } from '../common/logger/custom-logger.service';

@Injectable()
export class AppService {
  constructor(private customLogger: CustomLogger) {
    this.customLogger.setContext(AppService.name);
  }
  getData(): { message: string } {
    this.customLogger.setMethodName(this.getData.name);
    this.customLogger.log(`Returning message`);
    return { message: 'Welcome to To-Do App API!' };
  }
}
