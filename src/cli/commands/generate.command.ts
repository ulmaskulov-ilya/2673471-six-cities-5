import {CommandInterface} from './command.interface';
import {MockServerData} from '../../shared/types/index.js';
import {TSVOfferGenerator} from '../../shared/libs/offer-generator/index.js';
import axios from 'axios';
import {getErrorMessage} from '../../shared/helpers/index.js';
import {TSVFileWriter} from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements CommandInterface {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = (await axios.get(url)).data;
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...param: string[]): Promise<void> {
    const [count, filepath, url] = param;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      getErrorMessage(error);
    }
  }
}
