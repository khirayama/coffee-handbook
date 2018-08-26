interface IText {
  ja: string;
  en: string;
}

export const dictionary: {
  name: IText;
  author: IText;
  meta: {
    recipe: {
      category: {
        BEVERAGES: IText;
        FOODS: IText;
      };
      recipeType: {
        HOT: IText;
        ICED: IText;
      };
    };
    good: {
      category: {
        BREWERS: IText;
      };
    };
  };
  Components: {
    Navigation: {
      BEVERAGES: IText;
      FOODS: IText;
      GOODS: IText;
    };
    Footer: {
      ABOUT_US: IText;
      SITEMAP: IText;
      PRIVACY: IText;
      copyright: IText;
    };
    RecipeLink: {
      RECIPE: IText;
    };
  };
  Pages: {
    Home: {
      description: IText;
      LATEST_ARTICLES: IText;
    };
    Goods: {
      description: IText;
      GOODS: IText;
    };
    Privacy: {
      description: IText;
      PRIVACY: IText;
    };
  };
  Templates: {
    Beverages: {
      description: IText;
      BEVERAGES: IText;
    };
    Foods: {
      description: IText;
      FOODS: IText;
    };
    Recipe: {
      INGREDIENTS: IText;
    };
    Good: {
      buyAtAmazon: IText;
      relatedGoods: IText;
      relatedRecipes: IText;
    };
  };
} = {
  // Common
  name: {
    ja: '珈琲手帖',
    en: 'COFFEE HANDBOOK',
  },
  author: {
    ja: 'COFFEE HANDBOOK',
    en: 'COFFEE HANDBOOK',
  },
  // Meta
  meta: {
    recipe: {
      category: {
        BEVERAGES: {
          ja: 'ビバレッジ',
          en: 'BEVERAGES',
        },
        FOODS: {
          ja: 'フード',
          en: 'FOODS',
        },
      },
      recipeType: {
        HOT: {
          ja: 'ホット',
          en: 'HOT',
        },
        ICED: {
          ja: 'アイス',
          en: 'ICED',
        },
      },
    },
    good: {
      category: {
        BREWERS: {
          ja: '抽出器具',
          en: 'BREWERS',
        },
      },
    },
  },
  // Components
  Components: {
    Navigation: {
      BEVERAGES: {
        ja: 'BEVERAGES',
        en: 'BEVERAGES',
      },
      FOODS: {
        ja: 'FOODS',
        en: 'FOODS',
      },
      GOODS: {
        ja: 'GOODS',
        en: 'GOODS',
      },
    },
    Footer: {
      ABOUT_US: {
        ja: 'ABOUT US',
        en: 'ABOUT US',
      },
      SITEMAP: {
        ja: 'SITEMAP',
        en: 'SITEMAP',
      },
      PRIVACY: {
        ja: 'PRIVACY',
        en: 'PRIVACY [JA]',
      },
      copyright: {
        ja: ', All rights reserved.',
        en: ', All rights reserved.',
      },
    },
    RecipeLink: {
      RECIPE: {
        ja: 'レシピを見る',
        en: 'RECIPE',
      },
    },
  },
  // Pages
  Pages: {
    Home: {
      description: {
        ja: '珈琲手帖について',
        en: 'About COFFEE HANDBOOK',
      },
      LATEST_ARTICLES: {
        ja: '新着記事',
        en: 'Latest Articles',
      },
    },
    Goods: {
      description: {
        ja: 'グッズ',
        en: 'GOODS',
      },
      GOODS: {
        ja: 'グッズ',
        en: 'GOODS',
      },
    },
    Privacy: {
      description: {
        ja: 'プライバーポリシー',
        en: 'Privacy',
      },
      PRIVACY: {
        ja: 'プライバーポリシー',
        en: 'PRIVACY',
      },
    },
  },
  // Templates
  Templates: {
    // Template: Menu
    Beverages: {
      description: {
        ja: 'ビバレッジメニュー',
        en: 'Beverages menu',
      },
      BEVERAGES: {
        ja: 'ビバレッジ',
        en: 'BEVERAGES',
      },
    },
    // Template: Menu
    Foods: {
      description: {
        ja: 'フードメニュー',
        en: 'Foods menu',
      },
      FOODS: {
        ja: 'フード',
        en: 'FOODS',
      },
    },
    // Template: Recipe
    Recipe: {
      INGREDIENTS: {
        ja: '材料',
        en: 'INGREDIENTS',
      },
    },
    // Template: Good
    Good: {
      buyAtAmazon: {
        ja: 'Amazonで購入',
        en: 'Buy it at Amazon',
      },
      relatedGoods: {
        ja: '関連グッズ',
        en: 'Related Goods',
      },
      relatedRecipes: {
        ja: '関連レシピ',
        en: 'Related Recipes',
      },
    },
  },
};
