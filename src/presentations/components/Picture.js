import { View } from 'presentations/components/View';
import { onscreen } from 'utils/onscreen';

export class Picture extends View {
  init() {
    this.$imageEl = this.$el.find('.Picture--Image');

    this.props = {
      lazy: this.$el.data.lazy,
    };

    if (this.props.lazy) {
      this.$el.addClass('Picture__Ready');
    }
  }

  setEventListeners() {
    onscreen(
      window,
      this.el,
      () => {
        this.$el.removeClass('Picture__Ready');
      },
      100,
    );

    onscreen(
      window,
      this.el,
      () => {
        this.$imageEl.el.innerHTML = '';
        let html = this.$imageEl.el.parentNode.innerHTML;
        html = html.replace('<span ', '<img ');
        this.$imageEl.el.parentNode.innerHTML = html;

        this.$imageEl = this.$el.find('.Picture--Image');
        this.$imageEl.on('error', () => {
          console.log('error');
        });
      },
      0,
    );

    this.$imageEl.on('load', () => {
      this.$el.addClass('Picture__Loaded');
    });
  }
}
