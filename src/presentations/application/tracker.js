class Tracker {
  constructor(options) {
    /* INFO: options = {
     code: string;
     debug: boolean;
    } */
    this.options = options;
    this.analytics = this.options.debug ? this.log : window.ga;
    this.page = window.location.pathname;
    this.location = window.location.href;

    this.init(this.options.code);
  }

  init(code) {
    this.analytics('create', code, 'auto');
  }

  setPage(page) {
    this.page = page;
    this.analytics('set', 'page', this.page);
  }

  setLocation(location) {
    this.location = location;
    this.analytics('set', 'location', this.location);
  }

  // Ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/pages?hl=ja
  sendPageView(page = null) {
    const options = {
      title: window.document.title,
      page: page || this.page,
      location: this.location,
    };
    this.analytics('send', 'pageview', options);
  }

  // Ref: https://developers.google.com/analytics/devguides/collection/analyticsjs/
  sendEvent(eventCategory = null, eventAction = null, eventLabel = null, eventValue = null) {
    const options = {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
    };
    this.analytics('send', 'event', options);
  }

  // https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions?hl=ja
  sendException(exDescription) {
    const options = {
      exDescription,
      exFatal: false,
    };
    this.analytics('send', 'exception', options);
  }

  log(...args) {
    const texts = ['TRACK:'];
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      if (typeof arg === 'object') {
        texts.push(JSON.stringify(arg));
      } else {
        texts.push(arg);
      }
    }
    console.log(`%c${texts.join(' ')}`, 'color: #9e9e9e;');
  }
}

const route = window.options.route;
const loc =
  window.location.href.indexOf('lang=') === -1
    ? `${window.location.href}?lang=${window.options.lang}`
    : window.location.href;

window.tracker = new Tracker({
  code: window.options.gaCode,
  debug: window.options.env !== 'production',
});
window.tracker.setPage(route);
window.tracker.setLocation(loc);
window.tracker.sendPageView();
window.addEventListener(
  'error',
  err => {
    let message = 'Error: Unknown';
    if (err.message) {
      message = err.message;
    } else if (err.target.tagName === 'IMG') {
      message = `No Image: ${err.target.src}`;
    } else if (err.target.tagName === 'SCRIPT') {
      message = `No Script: ${err.target.src}`;
    } else if (err.target.tagName === 'LINK' && err.target.rel === 'stylesheet') {
      message = `No Stylesheet: ${err.target.href}`;
    }
    window.tracker.sendException(`${message} at ${loc}`);
  },
  true,
);
