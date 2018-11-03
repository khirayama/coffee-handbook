import { config } from 'config';

interface IText {
  ja: string;
  en: string;
}

export const dictionary: {
  name: IText;
  author: IText;
  siteDescription: IText;
  Components: {
    Footer: {
      ABOUT: IText;
      SITEMAP: IText;
      PRIVACY: IText;
      copyright: IText;
    };
  };
  Pages: {
    About: {
      description: IText;
      ABOUT: IText;
      text: IText;
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
    Sitemap: {
      SITEMAP: IText;
      description: IText;
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
  siteDescription: {
    ja: '世界珈琲地図',
    en: 'COFFEE MAP OF WORLD',
  },
  // Components
  Components: {
    Footer: {
      ABOUT: {
        ja: 'ABOUT',
        en: 'ABOUT',
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
  },
  // Pages
  Pages: {
    About: {
      ABOUT: {
        ja: '珈琲手帖について',
        en: 'ABOUT COFFEE HANDBOOK',
      },
      description: {
        ja: '珈琲手帖について',
        en: 'ABOUT COFFEE HANDBOOK',
      },
      text: {
        ja: `
          日々の珈琲の出来事を書き留めます。<br>
          個人で作っていて、皆さんの協力もお待ちしています。<br>
          GitHubでのPRや、SNSでのDMでも情報・修正を受け付けています。<br>
          <a href="${config.githubUrl}">[GitHub]</a> <a href="https://twitter.com/${
          config.twitterAccount
        }">[Twitter]</a>
          <ul>
            <li>お店の追加</li>
            <li>英語翻訳</li>
            <li>リファクタリング</li>
            <li>ABテスト</li>
          </ul>
        `,
        en: `
          This site has daily stuffs about coffee.<br>
          This site is made by individual. I'm looking forward to your support.<br>
          Please give me some feedbacks on GitHub PR or DM on SNS.<br>
          <a href="${config.githubUrl}">[GitHub]</a> <a href="https://twitter.com/${
          config.twitterAccount
        }">[Twitter]</a>
          <ul>
            <li>Add a store</li>
            <li>Translation to English or Japanese</li>
            <li>Refactoring</li>
            <li>AB testing</li>
          </ul>
        `,
      },
    },
    Privacy: {
      PRIVACY: {
        ja: 'プライバーポリシー',
        en: 'PRIVACY',
      },
      description: {
        ja: 'プライバーポリシー',
        en: 'Privacy',
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
          ja: 'なし/不明',
          en: 'No Support/Unknown',
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
    Sitemap: {
      SITEMAP: {
        ja: 'サイトマップ',
        en: 'SITEMAP',
      },
      description: {
        ja: '珈琲手帖のサイトマップ',
        en: 'SITEMAP OF COFFEE HANDBOOK',
      },
    },
  },
};
