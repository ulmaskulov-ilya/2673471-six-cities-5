import {FileWriter} from './file-writer-interface.js';
import {createWriteStream, WriteStream} from 'node:fs';


export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      encoding: 'utf8',
      flags: 'w',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise<unknown>((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }
    return Promise.resolve();
  }
}
