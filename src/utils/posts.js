const path = require('path');

const postsPath = path.join(__dirname, '..', 'data', 'posts');
const rawPosts = require(postsPath);

function build(post, lang) {
  return {
    id: post.id,
    createdAt: post.createdAt,
    publishedAt: post.publishedAt,
    thumbnailUrl: {
      default: post.thumbnailUrl.default[lang],
      square: post.thumbnailUrl.square[lang],
      rectangle: post.thumbnailUrl.rectangle[lang],
    },
    title: post.title[lang],
    content: post.content[lang],
    categories: post.categories.map(category => {
      return {
        id: category.id,
        name: category.name[lang],
        subCategory: category.subCategory
          ? {
              id: category.subCategory.id,
              name: category.subCategory.name[lang],
            }
          : null,
      };
    }),
    tags: post.tags.map(tag => {
      return {
        id: tag.id,
        name: tag.name[lang],
      };
    }),
  };
}

/* Usecase
find, findOne, where, page, order
*/

class Posts {
  constructor(lang) {
    this.lang = lang;
    this.tmp = rawPosts.map(rawPost => build(rawPost, this.lang));
  }

  find(num) {
    const tmp = this.tmp.slice();
    this.tmp = rawPosts.map(rawPost => build(rawPost, this.lang));
    return tmp.slice(tmp.length - num);
  }

  findOne() {
    const tmp = this.tmp.slice();
    this.tmp = rawPosts.map(rawPost => build(rawPost, this.lang));
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

module.exports = Posts;
