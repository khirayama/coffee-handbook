import { IPictureComponent } from 'presentations/components/Picture';

export interface IStoryCardComponent {
  publishedAt: string;
  title: string;
  picture: IPictureComponent;
}
