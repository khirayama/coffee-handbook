import { Picture } from 'presentations/components/Picture';
import { logger } from 'presentations/utils/logger';

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const pictureElements: NodeListOf<HTMLElement> = window.document.querySelectorAll('.Picture');
  for (const pictureElement of pictureElements) {
    new Picture(pictureElement); // tslint:disable-line:no-unused-expression
  }
});
