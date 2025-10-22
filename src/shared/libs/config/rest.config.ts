﻿import {Config} from './config.interface.js';
import {Logger} from '../logger/index.js';
import {config} from 'dotenv';
import {configRestSchema, RestSchema} from './index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read env file.');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }

}
