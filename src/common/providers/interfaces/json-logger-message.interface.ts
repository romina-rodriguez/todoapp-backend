export interface IJSONLoggerMessage {
  pidMessage: string;
  timestamp: string;
  logLevel: string;
  contextMessage: string;
  message: unknown;
}
