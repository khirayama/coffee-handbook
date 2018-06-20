import { View, ViewElement } from 'presentations/components/View';
import { onscreen } from 'presentations/utils/onscreen';

export interface IPictureComponent {
  src: string;
  alt: string;
  lazy: boolean;
}

export class Picture extends View {
  private $imageEl: ViewElement;

  private props: any;

  public init(): void {
    this.$imageEl = this.$el.find('.Picture--Image');

    this.props = {
      lazy: this.$el.data.lazy,
    };

    if (this.props.lazy) {
      this.$el.addClass('Picture__Ready');
    }
  }

  public setEventListeners(): void {
    onscreen(window, this.$el.current(), this.onPreScreenHandler.bind(this), 100);

    onscreen(window, this.$el.current(), this.onScreenHandler.bind(this), 0);

    this.$el.on('load', this.onLoadHandler.bind(this), true);

    this.$el.on('error', this.onErrorHandler.bind(this), true);
  }

  private onLoadHandler(): void {
    this.$el.addClass('Picture__Loaded');
  }

  private onErrorHandler(): void {
    this.$el.addClass('Picture__Failed');

    const text: string = this.$imageEl.attr('alt');
    let html: string = this.$el.html() || '';
    html = html.replace('<img ', '<span ').replace('>', `>${text}</span>`);
    this.$el.html(html);

    this.$imageEl = this.$el.find('.Picture--Image');
  }

  private onPreScreenHandler(): void {
    this.$el.removeClass('Picture__Ready');
  }

  private onScreenHandler(): void {
    this.$imageEl.html('');
    let html: string = this.$el.html() || '';
    html = html.replace('<span ', '<img ').replace('></span>', '>');
    this.$el.html(html);

    this.$imageEl = this.$el.find('.Picture--Image');
  }
}
