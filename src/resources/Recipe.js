const Resource = require('resources/Resource');

const coffeeHotRecipe = require('data/recipes/coffee-hot');
const coffeeIcedRecipe = require('data/recipes/coffee-iced');

const madeleineRecipe = require('data/recipes/madeleine');

const recipes = [coffeeHotRecipe, coffeeIcedRecipe, madeleineRecipe];

const Recipe = function(lang) {
  return new Resource(recipes, lang);
};

module.exports = Recipe;
