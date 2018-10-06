import { IPictureComponent } from 'presentations/components/Picture';

export interface IGoodCardComponent {
  url: string;
  name: string;
  category: string;
  picture: IPictureComponent;
}
