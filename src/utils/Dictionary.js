const dictionaryData = require('dictionary');

class Dictionary {
  constructor(lang) {
    this.lang = lang;
    this.dic = dictionaryData;
  }

  t(key) {
    const keys = key.split('.');
    let val = this.dic;
    for (let i = 0; i < keys.length; i++) {
      val = val[keys[i]];
    }
    return val[this.lang];
  }
}

module.exports = Dictionary;
