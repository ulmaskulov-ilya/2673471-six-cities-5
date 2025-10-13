import {Logger} from './logger.interface.js';
import {Logger as PinoInstance, pino, transport} from 'pino';
import {getCurrentModuleDirectoryPath} from '../../helpers/index.js';
import {resolve} from 'node:path';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: {destination},
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });
    this.logger = pino({}, multiTransport);
  }

  public error(msg: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, msg, ...args);
  }

  public info(msg: string, ...args: unknown[]): void {
    this.logger.info(null, msg, ...args);
  }

  public warn(msg: string, ...args: unknown[]): void {
    this.logger.warn(null, msg, ...args);
  }

  public debug(msg: string, ...args: unknown[]): void {
    this.logger.debug(null, msg, ...args);
  }

}
