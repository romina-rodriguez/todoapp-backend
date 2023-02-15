import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';

import { OpenSearchService } from '../providers/opensearch.provider';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  protected methodName: string;
  private openSearchService = new OpenSearchService(new ConfigService());

  setMethodName(methodName: string): void {
    this.methodName = methodName;
  }

  protected formatContext(context: string): string {
    return this.methodName
      ? `[${context}][${this.methodName}]`
      : `[${context}]`;
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    const timestamp = new Date(Date.now());

    const numberOnly = (value: string) => {
      return value.replace(/[^0-9]/g, '');
    };
    const JSONLoggerMessage = {
      pidMessage: numberOnly(pidMessage),
      timestamp: timestamp.toISOString(),
      logLevel,
      contextMessage,
      message,
      timestampDiff,
    };
    this.openSearchService.saveObject(JSONLoggerMessage);

    const output = this.stringifyMessage(message, logLevel);
    const loggerMessage = `${this.colorize(
      pidMessage,
      logLevel,
    )} ${timestamp.toISOString()} ${this.colorize(
      formattedLogLevel,
      logLevel,
    )} ${chalk.yellow(contextMessage)} ${output} ${timestampDiff}\n`;
    return loggerMessage;
  }
}
