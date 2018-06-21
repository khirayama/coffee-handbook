interface ITarget {
  el: HTMLElement;
  offset: number;
  displayed: boolean;
  handler(): void;
}

const screenHeight: number = window.innerHeight;
const listeners: {
  container: Window | HTMLElement;
  targets: ITarget[];
}[] = [];

function handleEvent(container: Window | HTMLElement): void {
  for (const listener of listeners) {
    if (listener.container === container) {
      listener.targets.forEach((target: ITarget) => {
        if (!target.displayed) {
          const rect: ClientRect = target.el.getBoundingClientRect();
          if (rect.top - target.offset < screenHeight) {
            target.displayed = true;
            target.handler();
          }
        }
      });
    }
  }
}

export function onscreen(
  container: Window | HTMLElement,
  target: HTMLElement,
  handler: () => void,
  offset: number,
): void {
  let attached: boolean = false;

  for (const listener of listeners) {
    if (listener.container === container) {
      attached = true;
      listener.targets.push({
        el: target,
        handler,
        offset,
        displayed: false,
      });
    }
  }

  handleEvent(container);
  if (!attached) {
    container.addEventListener('scroll', handleEvent.bind(null, container));
    container.addEventListener('resize', handleEvent.bind(null, container));
    container.addEventListener('touchmove', handleEvent.bind(null, container));
    listeners.push({
      container,
      targets: [
        {
          el: target,
          handler,
          offset,
          displayed: false,
        },
      ],
    });
  }
}
