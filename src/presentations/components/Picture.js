import { View } from 'components/View';

export class Picture extends View {
  init() {
    this.$imageEl = this.$el.find('.Picture--Image');

    this.props = {
      src: this.$el.data.src,
      alt: this.$el.data.alt,
      lazy: this.$el.data.lazy,
    };
  }

  setEventListeners() {
    this.$imageEl.on('load', () => {
      this.$el.addClass('Picture__Loaded');
    });

    window.document.addEventListener('scroll', () => {
      console.log('scroll');
    });
  }
}
