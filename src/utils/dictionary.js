const path = require('path');

const dicPath = path.join(__dirname, '..', 'data', 'dic');
const dic = require(dicPath);

class Dictionary {
  constructor(lang) {
    this.lang = lang;
    this.dic = dic;
  }
  t(key) {
    const keys = key.split('.');
    let val = this.dic;
    for (let i = 0; i < keys.length; i++) {
      val = val[keys[i]]
    }
    return val[this.lang];
  }
}

module.exports = Dictionary;
