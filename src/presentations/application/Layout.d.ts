import { Dictionary } from 'utils/Dictionary';

export interface ILayout {
  config: any;
  lang: string;
  path: string;
  dic: Dictionary;
  title: string;
  description: string;
  thumbnailUrl: string;
  pageType: string;
}
