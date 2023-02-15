export interface IJSONLoggerMessage {
  pid: string;
  timestamp: string;
  logLevel: string;
  contextMessage: string;
  message: unknown;
}
