import { ILayout } from 'presentations/application/Layout';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { IPictureComponent } from 'presentations/components/Picture';

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
