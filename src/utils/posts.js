const path = require('path');

const postsPath = path.join(__dirname, '..', 'data', 'posts');
const rawPosts = require(postsPath);

class Posts {
  constructor(lang) {
    this.lang = lang;
    this.posts = rawPosts.map(rawPost => this._build(rawPost));
  }

  findById(id) {
    for (let i = 0; i < this.posts.length; i++) {
      const post = this.posts[i];

      if (post.id === id) {
        return post;
      }
    }
  }

  _build(post) {
    return {
      id: post.id,
      createdAt: post.createdAt,
      publishedAt: post.publishedAt,
      title: post.title[this.lang],
      content: post.content[this.lang],
      categories: post.categories.map(category => {
        return {
          id: category.id,
          name: category.name[this.lang],
          subCategory: category.subCategory
            ? {
                id: category.subCategory.id,
                name: category.subCategory.name[this.lang],
              }
            : null,
        };
      }),
      tags: post.tags.map(tag => {
        return {
          id: tag.id,
          name: tag.name[this.lang],
        };
      }),
    };
  }
}

module.exports = Posts;
