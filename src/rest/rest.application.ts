import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../shared/types/index.js';
import {DatabaseClient} from '../shared/libs/database-client';
import {getMongoUri} from '../shared/helpers/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DataBaseClient) private readonly databaseClient: DatabaseClient) {
  }

  private async initDb() {
    const mongoUri = getMongoUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    )
    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database client');
    await this.initDb();
    this.logger.info('Init database client completed');
  }
}
