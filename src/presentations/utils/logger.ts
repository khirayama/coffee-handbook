// tslint:disable:no-console
// tslint:disable:no-any

export const logger: any = {
  log: (...args: any[]): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...args);
    }
  },
};
