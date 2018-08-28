## TODO

- [ ] Considers Maps (Display stores and events)

- SpotType
  - id
  - name [cafe, store, beans]
- Spot
  - id
  - typeId
  - name
  - address
  - lat
  - lng
  - hours
  - email
  - tel
  - media
    - web
    - ec
    - facebook
    - twitter
    - instagram
    - instagram hash tag
    - google maps
  - facilities
    - roaster
    - power
    - wifi
    - credit
  - permanentClosed
  - checker (headless chromeで死活監視)
- Events
  - name
  - hostIds storeId[]
  - position if store is not same
  - fee
  - description
  - cycle [annual, monthly, weekly, daily, none]
  - startAt
  - endAt
  - hours
  - checker (headless chromeで死活監視)

## Checklist

- [ ] Editing
  - [ ] About Us
  - [ ] Coffee Hot
  - [ ] Coffee Iced
  - [ ] Cold Brew
  - [ ] Latte Hot
  - [ ] Latte Iced
  - [ ] Americano Hot
  - [ ] Americano Iced
  - [ ] Mocha Hot
  - [ ] Mocha Iced
  - [ ] Vanilla Latte Hot
  - [ ] Vanilla Latte Iced
  - [ ] Cocoa Hot
  - [ ] Cocoa Iced
  - [ ] Espresso
  - [ ] Madleine
  - [ ] V60
- [ ] Design
  - [ ] Define our mission
  - [x] Create square/circle icon
  - [x] Create compress script
  - [x] Define image rules
  - [-] Make marketing space
- [x] Relations
  - [x] Config for OGP
  - [x] Create privacy
  - [x] Create instagram account https://www.instagram.com/coffee_handbook/
  - [x] Create twitter account https://twitter.com/coffee_handbook
  - [-] Create terms of service
  - [-] Create contact
  - [-] Create facebook page
- [x] Marketing
  - [x] Install Google Analytics
  - [-] Consider ad / affiliate
- [x] Engineering
  - [x] Search
  - [x] Create RSS
  - [x] Load image lazy
  - [x] Logging client error
  - [x] Build AB testing
  - [x] Install service worker
  - [x] Create sitemap
  - [x] Create robots.txt
  - [-] Base on WAI-ARIA
  - [-] Support AMP

## Memo

- Experience
  - Image Size
    - OGP Facebook
    - OGP Twitter
    - Instagram
    - Desktop
      - https://singoro.net/note/ogp-og_type/
  - GA
  - AB Testing
  - SEO
    - https://support.google.com/webmasters/answer/7451184?hl=ja
  - RSS
- Accessiblity
  - https://www.concentinc.jp/design_research/2018/03/btobcommunications-web-accessibility/
  - https://www.concentinc.jp/web_accessibility/
  - https://openameba.github.io/a11y-guidelines/
  - WAI-ARIA
- Performance
  - https://developers.google.com/web/tools/workbox/
  - http://tech.mercari.com/entry/2017/12/19/workbox
  - https://github.com/babel/minify
- Concents
  - 関係性をデザインする
  - 人気記事？
  - ユーザは何かを解決するためにここにくる
  - 家をカフェのように感じるために
    - 天気
    - 音楽
    - 本
    - 映像
  - どういうときにカフェにいく
  - どういう理由でカフェにいく

## PR

- Instagram
- Twitter
- Facebook
- YouTube
- Google Maps
- Foursquare

## Images

- Icon
  - square
  - circle
- Instagram 1:1
- Facebook OGP: 1.91:1(1200:630)
- Twitter OGP(summary_large_image): 1.91(1200:630)
  - https://cards-dev.twitter.com/validator

### Image size

- 3600 * 1890
- 1890 * 1890

### Refs

- [【2016年版】Facebook、Twitterに最適なOGP記述設定まとめ](https://liginc.co.jp/325552)
- [ツイートにページ情報を表示する「Twitterカード（Twitter Cards）」を設定してみた](https://www.granfairs.com/blog/staff/setting-twitter-cards)
- [HTMLのsrcsetを使って画像をレスポンシブにRetina対応させてみよう](http://kia-king.com/blog/tutorial/responsive-images-with-srcset/)
