const path = require('path');

const postsPath = path.join(__dirname, '..', 'data', 'posts');
const rawPosts = require(postsPath);

function build(value, lang) {
  if (Array.isArray(value)) {
    const result = [];
    for (let i = 0; i < value.length; i++) {
      const val = value[i];
      result[i] = build(val, lang);
    }
    return result;
  }

  if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number' || value === null) {
    return value;
  }

  const result = {};
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === lang) {
      return build(value[key], lang);
    }
    result[key] = build(value[key], lang);
  }

  return result;
}

/* Usecase
find, findOne, where, page, order
*/

class Resource {
  constructor(resources, lang) {
    this.resources = resources;
    this.lang = lang;
    this.tmp = build(this.resources, this.lang);
  }

  find(num) {
    const tmp = this.tmp.slice();
    this.tmp = build(this.resources, this.lang);
    return tmp.slice(tmp.length - num);
  }

  findOne() {
    const tmp = this.tmp.slice();
    this.tmp = build(this.resources, this.lang);
    return tmp[0];
  }

  where(condition) {
    this.tmp = this._include(this.tmp, condition);

    if (condition.excepted) {
      this.tmp = this._except(this.tmp, condition.excepted);
    }

    return this;
  }

  _include(items, condition) {
    let result = items;
    const keys = Object.keys(condition);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = condition[key];
      if (key !== 'excepted') {
        result = result.filter(item => {
          const target = item[key];
          if (Array.isArray(target)) {
            return this._include(target, val).length;
          }
          return target === val;
        });
      }
    }
    return result;
  }

  _except(items, condition) {
    let result = items;
    const keys = Object.keys(condition);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = condition[key];
      result = result.filter(item => {
        const target = item[key];
        if (Array.isArray(target)) {
          return !this._except(target, val).length;
        }
        return target !== val;
      });
    }

    return result;
  }
}

function createPosts(lang) {
  return new Resource(rawPosts, lang);
}

module.exports = createPosts;
