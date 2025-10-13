import {CommandInterface} from './command.interface';
import {TSVFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';

export class ImportCommand implements CommandInterface {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string): void {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows were imported`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);
    try {
      await fileReader.read();
    } catch (e) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(e)));
    }
  }
}
