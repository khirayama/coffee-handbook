import { tracker, Tracker } from 'presentations/utils/tracker';

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
  }
}

// Tracker
const route: string = window.options.route;
const loc: string = window.location.href;

tracker.setPage(route);
tracker.setLocation(loc);
tracker.sendPageView();

// Tracking Error
window.addEventListener(
  'error',
  (evt: ErrorEvent) => {
    let message: string = 'Error: Unknown';
    const target: HTMLElement = <HTMLElement>evt.target;
    if (evt.message) {
      message = evt.message;
    } else if (target instanceof HTMLImageElement) {
      message = `No Image: ${target.src}`;
    } else if (target instanceof HTMLScriptElement) {
      message = `No Script: ${target.src}`;
    } else if (target instanceof HTMLLinkElement) {
      message = `No Stylesheet: ${target.href}`;
    }
    tracker.sendException(`${message} at ${loc}`);
  },
  true,
);

// Service Worker
window.addEventListener(
  'DOMContentLoaded',
  (): void => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  },
);
