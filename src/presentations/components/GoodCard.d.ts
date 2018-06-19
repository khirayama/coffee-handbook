export interface IGoodCardComponent {
  good: {
    url: string;
    title: string;
    name: string;
    category: string;
    meta: {
      thumbnailUrl: {
        square: string;
      };
    };
  };
}
