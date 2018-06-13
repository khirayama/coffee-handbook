const recipes = require('data/recipes');
const Resource = require('resources/Resource');

const Recipe = function(lang) {
  return new Resource(recipes, lang);
};

module.exports = Recipe;
