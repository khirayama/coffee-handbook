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
    Maps: {
      day: {
        0: IText;
        1: IText;
        2: IText;
        3: IText;
        4: IText;
        5: IText;
        6: IText;
      };
      openStatus: {
        0: IText;
        1: IText;
        2: IText;
        3: IText;
      };
      services: {
        roaster: IText;
        speciality: IText;
        beans: IText;
        credit: IText;
        power: IText;
        wifi: IText;
        barrierFree: IText;
        pet: IText;
        smoking: IText;
      };
      serviceDescription: {
        notation: IText;
        support: IText;
        partialSupport: IText;
        noSupport: IText;
      };
      openStatusDescription: IText;
      closed: IText;
      openAt(time: string): IText;
      closeAt(time: string): IText;
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
    Maps: {
      day: {
        0: {
          ja: '日曜日',
          en: 'Sunday',
        },
        1: {
          ja: '月曜日',
          en: 'Monday',
        },
        2: {
          ja: '火曜日',
          en: 'Tuesday',
        },
        3: {
          ja: '水曜日',
          en: 'Wednesday',
        },
        4: {
          ja: '木曜日',
          en: 'Thursday',
        },
        5: {
          ja: '金曜日',
          en: 'Friday',
        },
        6: {
          ja: '土曜日',
          en: 'Saturday',
        },
      },
      openStatus: {
        0: {
          ja: '営業時間外',
          en: 'Closed',
        },
        1: {
          ja: 'まもなく開店',
          en: 'Open soon',
        },
        2: {
          ja: '営業中',
          en: 'Open now',
        },
        3: {
          ja: 'まもなく閉店',
          en: 'Close soon',
        },
      },
      services: {
        roaster: {
          ja: '焙煎機',
          en: 'Roster',
        },
        speciality: {
          ja: 'スペシャリティ<br>コーヒー',
          en: 'Speciality<br>Coffee',
        },
        beans: {
          ja: '豆販売',
          en: 'Selling<br>Beans',
        },
        credit: {
          ja: 'クレジットカード',
          en: 'Credit Card',
        },
        power: {
          ja: '電源',
          en: 'Power',
        },
        wifi: {
          ja: 'Wi-Fi',
          en: 'Wi-Fi',
        },
        barrierFree: {
          ja: 'バリアフリー',
          en: 'Barrier Free',
        },
        pet: {
          ja: 'ペット同伴',
          en: 'Pets',
        },
        smoking: {
          ja: '喫煙',
          en: 'Smoking',
        },
      },
      serviceDescription: {
        notation: {
          ja: '表記',
          en: 'Notation',
        },
        support: {
          ja: 'あり',
          en: 'Support',
        },
        partialSupport: {
          ja: '一部あり',
          en: 'Partial Support',
        },
        noSupport: {
          ja: 'なし',
          en: 'No Support',
        },
      },
      openAt: (time: string): IText => {
        return {
          ja: `${time} 開店`,
          en: `Opens at ${time}`,
        };
      },
      closeAt: (time: string): IText => {
        return {
          ja: `${time} 閉店`,
          en: `Closes ${time}`,
        };
      },
      openStatusDescription: {
        ja: '営業状況・日程などは必ずご確認の上、ご利用ください。',
        en: 'Please make sure the status for visiting.',
      },
      closed: {
        ja: '定休日',
        en: 'Closed',
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
