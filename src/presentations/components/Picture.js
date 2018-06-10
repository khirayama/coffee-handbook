import { View } from 'presentations/components/View';
import { onscreen } from 'presentations/utils/onscreen';

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
    onscreen(window, this.$el.current(), this.onPreScreenHandler.bind(this), 100);

    onscreen(window, this.$el.current(), this.onScreenHandler.bind(this), 0);

    this.$el.on('load', this.onLoadHandler.bind(this), true);

    this.$el.on('error', this.onErrorHandler.bind(this), true);
  }

  onLoadHandler() {
    this.$el.addClass('Picture__Loaded');
  }

  onErrorHandler() {
    this.$el.addClass('Picture__Failed');

    const text = this.$imageEl.get('alt');
    let html = this.$el.html();
    html = html.replace('<img ', '<span ').replace('>', `>${text}</span>`);
    this.$el.html(html);

    this.$imageEl = this.$el.find('.Picture--Image');
  }

  onPreScreenHandler() {
    this.$el.removeClass('Picture__Ready');
  }

  onScreenHandler() {
    this.$imageEl.html('');
    let html = this.$el.html();
    html = html.replace('<span ', '<img ').replace('></span>', '>');
    this.$el.html(html);

    this.$imageEl = this.$el.find('.Picture--Image');
  }
}
