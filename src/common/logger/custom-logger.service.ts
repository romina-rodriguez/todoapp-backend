import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  protected methodName: string;

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
    const output = this.stringifyMessage(message, logLevel);
    return `${this.colorize(
      pidMessage,
      logLevel,
    )} ${this.getTimestamp()} ${this.colorize(
      formattedLogLevel,
      logLevel,
    )} ${chalk.yellow(contextMessage)} ${output} ${timestampDiff}\n`;
  }
}
