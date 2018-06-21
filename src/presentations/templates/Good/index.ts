import { ILayout } from 'presentations/application/Layout';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { IPictureComponent, Picture } from 'presentations/components/Picture';
import { logger } from 'presentations/utils/logger';

export interface ISpecRowComponent {
  name: string;
  value: string;
}

export interface IGoodTemplate extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
  good: {
    name: string;
    category: string;
    summary: string;
    content: string;
    pictures: IPictureComponent[];
    specs: ISpecRowComponent[];
  };
  relatedGoods: IGoodCardComponent[];
}

window.addEventListener('DOMContentLoaded', () => {
  logger.log(`Start app at ${new Date().toString()}.`);

  const pictureElements: NodeListOf<HTMLElement> = window.document.querySelectorAll('.Picture');
  for (const pictureElement of pictureElements) {
    new Picture(pictureElement); // tslint:disable-line:no-unused-expression
  }
});
