export interface Logger {
  info(msg: string): void;
  warn(msg: string, ...args: unknown[]): void;
  error(msg: string, error: Error, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
}
