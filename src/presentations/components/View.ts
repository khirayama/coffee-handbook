// tslint:disable:no-any
export class ViewElement {
  public el: HTMLElement;

  public data: { [key: string]: any };

  constructor(el: HTMLElement) {
    this.el = el;
    if (this.el) {
      this.data = this.extractData();
    }
  }

  public extractData(): { [key: string]: any } {
    const data: { [key: string]: string | boolean | number } = {};
    const keys: string[] = Object.keys(this.el.dataset);
    for (const key of keys) {
      const value: string = this.el.dataset[key];
      try {
        data[key] = JSON.parse(value);
      } catch (e) {
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

  public toggleClass(className: string): void {
    if (this.el.classList.contains(className)) {
      this.el.classList.remove(className);
    } else {
      this.el.classList.add(className);
    }
  }

  public html(html?: string): string {
    if (html || html === '') {
      this.el.innerHTML = html;
    }

    return this.el.innerHTML;
  }
}

export class View {
  public el: HTMLElement;

  public $el: ViewElement;

  protected props: object;

  constructor(el: HTMLElement, props?: object) {
    this.el = el;
    this.$el = new ViewElement(el);
    this.props = props;

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
