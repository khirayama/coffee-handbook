declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    options: {
      env: string;
      lang: string;
      gaCode: string;
      route: string;
    };
    ga(...args: (string | IPageViewOptions | IEventOptions | IExceptionOptions)[]): void;
  }
}

interface IOptions {
  code?: string;
  debug?: boolean;
}

export interface IPageViewOptions {
  title: string;
  page: string;
  location: string;
}

export interface IEventOptions {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: string;
}

export interface IExceptionOptions {
  exDescription: string;
  exFatal: boolean;
}

function isBrowser(): boolean {
  return typeof window === 'object';
}

export class Tracker {
  private options: IOptions;

  private analytics: (...args: (string | IPageViewOptions | IEventOptions | IExceptionOptions)[]) => void;

  private page: string;

  private loc: string;

  constructor(options: IOptions) {
    if (isBrowser()) {
      this.options = options;
      this.analytics = this.options.debug ? this.log : window.ga;
      this.page = window.location.pathname;
      this.loc = window.location.href;

      this.init(this.options.code);
    }
  }

  public setPage(page: string): void {
    this.page = page;
    this.analytics('set', 'page', this.page);
  }

  public setLocation(loc: string): void {
    this.loc = loc;
    this.analytics('set', 'location', this.loc);
  }

  // Ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
  public sendPageView(page?: string): void {
    const options: IPageViewOptions = {
      title: window.document.title,
      page: page || this.page,
      location: this.loc,
    };
    this.analytics('send', 'pageview', options);
  }

  // Ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  public sendEvent(eventCategory?: string, eventAction?: string, eventLabel?: string, eventValue?: string): void {
    const options: IEventOptions = {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
    };
    this.analytics('send', 'event', options);
  }

  // Ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
  public sendException(exDescription: string): void {
    const options: IExceptionOptions = {
      exDescription,
      exFatal: false,
    };
    this.analytics('send', 'exception', options);
  }

  private init(code: string): void {
    this.analytics('create', code, 'auto');
  }

  private log(...args: string[]): void {
    const texts: string[] = ['[TRACK]:'];
    for (const arg of args) {
      if (typeof arg === 'object') {
        texts.push(JSON.stringify(arg));
      } else {
        texts.push(arg);
      }
    }
    // tslint:disable-next-line:no-console
    console.log(`%c${texts.join(' ')}`, 'color: #9e9e9e;');
  }
}

export const tracker: Tracker = new Tracker({
  code: isBrowser() ? window.options.gaCode : '',
  debug: isBrowser() ? window.options.env !== 'production' : true,
});
