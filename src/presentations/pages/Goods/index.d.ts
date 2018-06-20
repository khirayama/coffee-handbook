import { ILayout } from 'presentations/application/Layout';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';

export interface IGoodsPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
  categoryTitle: {
    heading: string;
  };
  goodList: IGoodCardComponent[];
}
