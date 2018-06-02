const fs = require('fs');
const path = require('path');

const minimist = require('minimist');
const pug = require('pug');

const argv = minimist(process.argv.slice(2));

const rootPath = path.join(__dirname, '..', argv._[0]);
const distPath = path.join(__dirname, '..', argv.o);
const metaPath = path.join(__dirname, '..', argv.m);
const config = require(path.join(__dirname, '..', 'config.json'));

// Load meta data
const meta = require(metaPath);

// Load post data
const posts = [];

function loadPost(filePath) {
  const meta = require(filePath);
  const post = Object.assign({}, meta);
  post.content = {};
  for (let i = 0; i < config.languages.length; i++) {
    const lang = config.languages[i];
    let content = '';
    try {
      content = fs.readFileSync(filePath.replace('meta.js', `content.${lang}.pug`), 'utf-8');
    } catch (err) {}
    post.content[lang] = pug.compile(content)();
  }
  posts.push(post);
}

function loadPosts(rootPath) {
  const fileNames = fs.readdirSync(rootPath);
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const filePath = rootPath + '/' + fileName;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      loadPosts(filePath);
    } else if (fileName === 'meta.js') {
      loadPost(filePath);
    }
  }
}

loadPosts(rootPath);

// Generate posts
for (let i = 0; i < posts.length; i++) {
  const post = posts[i];

  post.categories = post.categories.map(categoryIds => {
    const categoryId = categoryIds[0];
    const subCategoryId = categoryIds[1] || null;

    for (let j = 0; j < meta.categories.length; j++) {
      const category = meta.categories[j];

      if (category.id === categoryId) {
        const newCategory = {
          id: category.id,
          name: Object.assign({}, category.name),
          subCategory: null,
        };
        for (let k = 0; k < category.subCategories.length; k++) {
          const subCategory = category.subCategories[k];

          if (subCategory.id === subCategoryId) {
            newCategory.subCategory = {
              id: subCategory.id,
              name: Object.assign({}, subCategory.name),
            };
          }
        }
        return newCategory;
      }
    }
    return null;
  });
  post.tags = post.tags.map(tagId => {
    for (let j = 0; j < meta.tags.length; j++) {
      const tag = meta.tags[j];

      if (tag.id === tagId) {
        return {
          id: tag.id,
          name: Object.assign({}, tag.name),
        };
      }
    }
    return null;
  });
}

posts.sort((a, b) => {
  return new Date(a.publishedAt).getTime() < new Date(b.publishedAt).getTime();
});

fs.writeFile(distPath, JSON.stringify(posts), () => {});
