﻿import {Container} from 'inversify';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {RestApplication} from '../rest/index.js';
import {Component} from '../shared/types/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();
  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DataBaseClient).to(MongoDatabaseClient).inSingletonScope();
  return restApplicationContainer;
}
