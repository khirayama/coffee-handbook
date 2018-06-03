/* eslint-disable no-console */
const path = require('path');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
const DIST = './src/public';

const inputFilenames = glob.sync(path.join(__dirname, 'src', 'presentations', '**', 'index.js'));
const entry = {};
for (let i = 0; i < inputFilenames.length; i++) {
  const inputFilename = inputFilenames[i];
  const outputFilename = inputFilename
    .replace(path.join(__dirname, 'src', 'presentations'), DIST)
    .replace('index.js', 'bundle');
  entry[outputFilename] = inputFilename;
}

const config = {
  entry,
  output: {
    filename: '[name].js',
    path: __dirname,
  },
  resolve: {
    modules: ['src/presentations', 'node_modules'],
    extensions: ['.js', '.json'],
  },
  plugins: [],
  optimization: {
    splitChunks: {
      name: 'commons',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

if (NODE_ENV === 'production') {
  console.log(`Building as production...`);
  config.optimization.minimize = true;

  if (process.env.ANALYSIS === 'true') {
    console.log(`Building for analyze...`);
    config.plugins.push(new BundleAnalyzerPlugin());
  }
} else {
  console.log('Building as development...');
  config.devtool = 'inline-source-map';
}

module.exports = config;
