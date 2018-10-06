module.exports = {
  apps : [{
    watch: ['dist'],
    name: "coffee-handbook",
    script: "./dist/index.js",
    env_production: process.env,
  }]
};
