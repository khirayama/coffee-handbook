import { View } from 'presentations/components/View';

// - [ ] 開閉アイコン
// - [ ] 電話アイコン
// - [ ] メールアイコン
// - [ ] webアイコン
// - [ ] ecアイコン
// - [ ] facebookアイコン
// - [ ] twitterアイコン
// - [ ] instagramアイコン
// - [ ] instagramTagアイコン
// - [ ] googleMapsアイコン

export class StoreCard extends View {
  public setEventListeners(): void {
    this.$el.find('.StoreCard--Content--OpenStatus').on('click', this.toggleHours.bind(this));
  }

  public toggleHours(): void {
    this.$el.find('.StoreCard--Hours').toggleClass('StoreCard--Hours__Show');
  }

  public hideHours(): void {
    this.$el.find('.StoreCard--Hours').removeClass('StoreCard--Hours__Show');
  }
}
