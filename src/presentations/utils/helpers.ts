// tslint:disable:export-name no-any
import { shortAnimationTime } from 'vars';

export function waitShortAnimationEnd(): Promise<void> {
  return new Promise(
    (resolve: any): void => {
      setTimeout(resolve, shortAnimationTime);
    },
  );
}
