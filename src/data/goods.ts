import { harioV60 } from 'data/goods/harioV60';

export interface IRawGood {
  key: string;
  url: string;
  meta: {
    title: {
      ja: string;
      en: string;
    };
    description: {
      ja: string;
      en: string;
    };
    thumbnailUrl: {
      square: {
        ja: string;
        en: string;
      };
      rectangle: {
        ja: string;
        en: string;
      };
    };
  };
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

export const goods: IRawGood[] = [harioV60, harioV60, harioV60, harioV60];
