import { IEventOptions, IExceptionOptions, IPageViewOptions, Tracker } from 'presentations/application/Tracker';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    options: {
      env: string;
      lang: string;
      gaCode: string;
      route: string;
    };
    tracker: Tracker;
    ga(...args: (string | IPageViewOptions | IEventOptions | IExceptionOptions)[]): void;
  }
}

// Service Worker
window.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
});

// Tracker
const route: string = window.options.route;
const currentLoc: string =
  window.location.href.indexOf('lang=') === -1
    ? `${window.location.href}?lang=${window.options.lang}`
    : window.location.href;

window.tracker = new Tracker({
  code: window.options.gaCode,
  debug: window.options.env !== 'production',
});
window.tracker.setPage(route);
window.tracker.setLocation(currentLoc);
window.tracker.sendPageView();
window.addEventListener(
  'error',
  (evt: ErrorEvent) => {
    let message: string = 'Error: Unknown';
    const target: HTMLElement = <HTMLElement> evt.target;
    if (evt.message) {
      message = evt.message;
    } else if (target instanceof HTMLImageElement) {
      message = `No Image: ${target.src}`;
    } else if (target instanceof HTMLScriptElement) {
      message = `No Script: ${target.src}`;
    } else if (target instanceof HTMLLinkElement) {
      message = `No Stylesheet: ${target.href}`;
    }
    window.tracker.sendException(`${message} at ${currentLoc}`);
  },
  true,
);
