class ViewElement {
  constructor(el) {
    this.el = el;
    this.data = this.extractData();
  }

  extractData() {
    const data = {};
    const keys = Object.keys(this.el.dataset);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = this.el.dataset[key];
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

  find(selector) {
    const el = this.el.querySelector(selector);
    return new ViewElement(el);
  }

  on(eventType, handler) {
    this.el.addEventListener(eventType, handler);
  }

  addClass(className) {
    this.el.classList.add(className);
  }

  removeClass(className) {
    this.el.classList.remove(className);
  }
}

export class View {
  constructor(el) {
    this.el = el;
    this.$el = new ViewElement(el);

    if (this.init) {
      this.init();
    }
    this.setEventListeners();
  }

  setEventListeners() {
    // Noop
  }
}
