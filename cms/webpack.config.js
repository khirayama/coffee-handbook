/* eslint-disable no-console */
const path = require('path');

const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const GasWebpackPlugin = require('gas-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = (env, argv) => {
  const config = {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'tmp'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
        }),
      ],
    },
    plugins: [
      new GasWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: process.env.NODE_ENV,
          GOOGLE_ANALYTICS_CODE: process.env.GOOGLE_ANALYTICS_CODE,
          MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
        }),
      }),
    ],
    optimization: {
      minimize: argv.mode === 'production',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        },
      ],
    },
  };

  if (NODE_ENV === 'production') {
    console.log(`Building as production...`);
    config.optimization.minimize = true;
  } else {
    console.log('Building as development...');
    config.devtool = 'inline-source-map';
  }

  return config;
};
