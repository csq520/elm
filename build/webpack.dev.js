const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const appData = require('../data.json');

const { seller } = appData;
const { goods } = appData;
const { ratings } = appData;

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    // open: true,
    port: 9090,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      },
    },
    before(app) {
      app.get('/api/data', (req, res) => {
        res.json({
          ret: true,
          data: appData,
        });
      });
      app.get('/api/seller', (req, res) => {
        res.json({
          ret: true,
          data: seller,
        });
      });
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods,
        });
      });
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings,
        });
      });
    },
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'sass-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.stylus$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'stylus-loader',
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
};

module.exports = merge(commonConfig, devConfig);
