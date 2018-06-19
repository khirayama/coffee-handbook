import { ILayout } from 'presentations/application/Layout';
import { IGoodCardComponent } from 'presentations/components/GoodCard';

export interface IGoodTemplate extends ILayout {
  good:
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
    | IGoodCardComponent;
}
