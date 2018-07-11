import { harioV60 } from 'data/goods/harioV60';

import { IRawPost } from 'data/posts';

export interface IRawGood {
  category: {
    ja: string;
    en: string;
  };
  name: {
    ja: string;
    en: string;
  };
  pictures: {
    url: {
      ja: string;
      en: string;
    };
    caption: {
      ja: string;
      en: string;
    };
  }[];
  summary: {
    ja: string;
    en: string;
  };
  specs: {
    name: {
      ja: string;
      en: string;
    };
    value: {
      ja: string;
      en: string;
    };
  }[];
  content: {
    ja: string;
    en: string;
  };
  colors: string[];
  links: {
    site: string;
    url: string;
  }[];
}

export const goods: IRawPost<IRawGood>[] = [harioV60, harioV60, harioV60, harioV60];
