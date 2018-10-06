import { View } from 'presentations/components/View';

export class Modal extends View {
  public setEventListeners(): void {
    this.$el.find('.Modal--CloseButton').on('click', () => {
      this.close();
    });
  }

  public open(): void {
    this.$el.removeClass('Modal__Hidden');
  }

  public close(): void {
    this.$el.addClass('Modal__Hidden');
  }
}
