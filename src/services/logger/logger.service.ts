import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  log(message: string) {
    super.log(`[Custom Logger] ${message}`);
  }

  error(message: string, trace: string) {
    super.error(`[Custom Logger] ${message}`, trace);
  }

  warn(message: string) {
    super.warn(`[Custom Logger] ${message}`);
  }

  debug(message: string) {
    super.debug(`[Custom Logger] ${message}`);
  }

  verbose(message: string) {
    super.verbose(`[Custom Logger] ${message}`);
  }
}
