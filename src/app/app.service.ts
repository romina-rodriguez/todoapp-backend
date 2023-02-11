import { Injectable } from '@nestjs/common';

import { CustomLogger } from '../common/logger/custom-logger.service';

@Injectable()
export class AppService {
  constructor(private customLogger: CustomLogger) {
    this.customLogger.setContext(AppService.name);
  }
  getData(): { message: string } {
    const methodName = this.getData.name;
    this.customLogger.log(`[${methodName}] Returning message`);
    return { message: 'Welcome to To-Do App API!' };
  }
}
