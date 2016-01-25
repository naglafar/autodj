const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const source = path.join(__dirname, 'src');
const jsAndJsx = /\.jsx?$/;

module.exports = {
  entry: {
    autoDJ: ['./src/main.jsx', './src/theme/main.less'],
    vendor: [
      'babel-polyfill',
      'fluxxor',
      'history',
      'moment',
      'ramda',
      'react',
      'react-addons-linked-state-mixin',
      'react-datetime',
      'react-dom',
      'react-router',
      'uuid',
      'react-dropzone'
    ]
  },
  output: {
    path: './build/',
    pathInfo: true,
    publicPath: './',
    filename: '[name].js'
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('autoDJ.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: jsAndJsx,
        include: source,
        exclude: /node_modules/,
        loader: 'babel-loader',
        plugins: ['transform-runtime'],
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  }
};
