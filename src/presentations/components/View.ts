export class ViewElement {
  public el: HTMLElement;

  public data: any;

  constructor(el: HTMLElement) {
    this.el = el;
    this.data = this.extractData();
  }

  public extractData(): { [key: string]: string | boolean | number } {
    const data: { [key: string]: string | boolean | number } = {};
    const keys: string[] = Object.keys(this.el.dataset);
    for (const key of keys) {
      const value: string = this.el.dataset[key];
      if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else {
        data[key] = value;
      }
    }

    return data;
  }

  public current(): HTMLElement {
    return this.el;
  }

  public find(selector: string): ViewElement {
    const el: HTMLElement = this.el.querySelector(selector);

    return new ViewElement(el);
  }

  public on(eventType: string, handler: any, options: any): void {
    this.el.addEventListener(eventType, handler, options);
  }

  public attr(attr: string): any {
    return this.el[attr];
  }

  // public set(attr: string, value: string): void {
  //   this.el[attr] = value;
  // }

  public addClass(className: string): void {
    this.el.classList.add(className);
  }

  public removeClass(className: string): void {
    this.el.classList.remove(className);
  }

  public html(html?: string): string | void {
    if (html || html === '') {
      this.el.innerHTML = html;
    } else {
      return this.el.innerHTML;
    }
  }
}

export class View {
  public $el: ViewElement;

  constructor(el: HTMLElement) {
    this.$el = new ViewElement(el);

    this.init();
    this.setEventListeners();
  }

  protected init(): void {
    // Noop
  }

  protected setEventListeners(): void {
    // Noop
  }
}
