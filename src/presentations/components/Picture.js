import { View } from 'presentations/components/View';
import { onscreen } from 'utils/onscreen';

export class Picture extends View {
  init() {
    this.$imageEl = this.$el.find('.Picture--Image');

    this.props = {
      src: this.$el.data.src,
      lazy: this.$el.data.lazy,
    };

    if (this.props.lazy) {
      this.$el.addClass('Picture__Ready');
    }
  }

  setEventListeners() {
    onscreen(window, this.el, () => {
      this.$el.removeClass('Picture__Ready');
      this.$imageEl.el.src = this.props.src;
    });

    this.$imageEl.on('load', () => {
      this.$el.addClass('Picture__Loaded');
    });
  }
}
