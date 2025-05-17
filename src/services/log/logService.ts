export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

interface LogOptions {
  context?: string;
  level?: LogLevel;
}

class LogService {
  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private formatMessage(
    message: string,
    context?: string,
    level: LogLevel = 'log',
  ): string {
    const timestamp = this.getTimestamp();
    const formattedLevel = level.toUpperCase().padEnd(7);
    const contextStr = context ? `[${context}] ` : '';

    return `${timestamp} ${formattedLevel} ${contextStr}${message}`;
  }

  private printLog(
    message: any,
    options?: LogOptions,
    ...optionalParams: any[]
  ) {
    const level = options?.level || 'log';
    const context = options?.context;

    const formattedMessage =
      typeof message === 'string'
        ? this.formatMessage(message, context, level)
        : message;

    switch (level) {
      case 'error':
        console.error(formattedMessage, ...optionalParams);
        break;
      case 'warn':
        console.warn(formattedMessage, ...optionalParams);
        break;
      case 'debug':
        console.debug(formattedMessage, ...optionalParams);
        break;
      case 'verbose':
      case 'log':
      default:
        console.log(formattedMessage, ...optionalParams);
        break;
    }

    // Here you could add integration with an error reporting service
    // or a remote logging system if needed
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    this.printLog(message, {level: 'log', context}, ...optionalParams);
  }

  error(message: any, context?: string, ...optionalParams: any[]) {
    this.printLog(message, {level: 'error', context}, ...optionalParams);
  }

  warn(message: any, context?: string, ...optionalParams: any[]) {
    this.printLog(message, {level: 'warn', context}, ...optionalParams);
  }

  debug(message: any, context?: string, ...optionalParams: any[]) {
    this.printLog(message, {level: 'debug', context}, ...optionalParams);
  }

  verbose(message: any, context?: string, ...optionalParams: any[]) {
    this.printLog(message, {level: 'verbose', context}, ...optionalParams);
  }

  // Helper method to log with a specific context
  scope(context: string) {
    return {
      log: (message: any, ...optionalParams: any[]) =>
        this.log(message, context, ...optionalParams),
      error: (message: any, ...optionalParams: any[]) =>
        this.error(message, context, ...optionalParams),
      warn: (message: any, ...optionalParams: any[]) =>
        this.warn(message, context, ...optionalParams),
      debug: (message: any, ...optionalParams: any[]) =>
        this.log(message, context, ...optionalParams),
      verbose: (message: any, ...optionalParams: any[]) =>
        this.verbose(message, context, ...optionalParams),
    };
  }
}

export const logService = new LogService();
