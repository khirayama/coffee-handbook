import { ILayout } from 'presentations/application/Layout';
import { IGoodCardComponent } from 'presentations/components/GoodCard';

export interface IGoodsPage extends ILayout {
  heading: string;
  goods: (
    | {
        name: string;
        category: string;
        summary: string;
        content: string;
        pictures: {
          url: string;
          caption: string;
        }[];
        specs: {
          name: string;
          value: string;
        }[];
      }
    | IGoodCardComponent)[];
}
