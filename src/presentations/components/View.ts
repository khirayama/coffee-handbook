export class ViewElement {
  public el: HTMLElement;

  public data: { [key: string]: string | boolean | number };

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

  public findAll(selector: string): ViewElement[] {
    const els: NodeListOf<HTMLElement> = this.el.querySelectorAll(selector);
    const viewElements: ViewElement[] = [];

    for (const el of els) {
      viewElements.push(new ViewElement(el));
    }

    return viewElements;
  }

  public on(eventType: string, handler: () => void, options?: {}): void {
    this.el.addEventListener(eventType, handler, options);
  }

  public attr(attr: string, value?: string): string {
    if (value) {
      this.el[attr] = value;
    }

    return this.el[attr];
  }

  public addClass(className: string): void {
    this.el.classList.add(className);
  }

  public removeClass(className: string): void {
    this.el.classList.remove(className);
  }

  public html(html?: string): string {
    if (html || html === '') {
      this.el.innerHTML = html;
    }

    return this.el.innerHTML;
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
