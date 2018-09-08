import { View } from 'presentations/components/View';

export class StoreCard extends View {
  public setEventListeners(): void {
    this.$el.find('.StoreCard--Content--OpenStatus').on('click', this.toggleHours.bind(this));
  }

  public toggleHours(): void {
    this.$el.find('.StoreCard--Content--Hours').toggleClass('StoreCard--Content--Hours__Show');
  }

  public hideHours(): void {
    this.$el.find('.StoreCard--Content--Hours').removeClass('StoreCard--Content--Hours__Show');
  }
}
