// tslint:disable:no-console
// tslint:disable:no-any

export const logger: any = {
  log: (...args: any[]): void => {
    console.log(...args);
  },
};
