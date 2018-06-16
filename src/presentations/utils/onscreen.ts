const screenHeight = window.innerHeight;
const listeners = [];
/* {
  container: null,
  targets: [{
   target: null,
   handler: () => {},
   displayed: false,
  }],
} */

function handleEvent(container) {
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    if (listener.container === container) {
      listener.targets.forEach(target => {
        if (!target.displayed) {
          const rect = target.el.getBoundingClientRect();
          if (rect.top - target.offset < screenHeight) {
            target.displayed = true;
            target.handler();
          }
        }
      });
    }
  }
}

export function onscreen(container, target, handler, offset) {
  let attached = false;

  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];

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
    container.addEventListener('scroll', handleEvent.bind(this, container));
    container.addEventListener('resize', handleEvent.bind(this, container));
    container.addEventListener('touchmove', handleEvent.bind(this, container));
    listeners.push({
      container,
      targets: [{ el: target, handler }],
    });
  }
}
