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

  current() {
    return this.el;
  }

  find(selector) {
    const el = this.el.querySelector(selector);
    return new ViewElement(el);
  }

  on(eventType, handler, options) {
    this.el.addEventListener(eventType, handler, options);
  }

  get(attr) {
    return this.el[attr];
  }

  set(attr, value) {
    this.el[attr] = value;
  }

  addClass(className) {
    this.el.classList.add(className);
  }

  removeClass(className) {
    this.el.classList.remove(className);
  }

  html(html) {
    if (html || html === '') {
      this.el.innerHTML = html;
    } else {
      return this.el.innerHTML;
    }
  }
}

export class View {
  constructor(el) {
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
