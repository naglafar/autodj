var path = require('path');
var webpack = require('webpack');

const source = path.join(__dirname, 'src');
const jsAndJsx = /\.jsx?$/;

module.exports = {
    entry: [
        'babel-polyfill',
        './src/theme/main.less',
        './src/main.jsx',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        path: './build/',
        pathInfo: true,
        publicPath: '/',
        filename: 'main.js',
        css: 'style.css'
    },
    debug: true,
    devtool: 'inline-source-map',
    module: {
        preLoaders: [
            {
                test: jsAndJsx,
                loaders: ['eslint-loader'],
                include: source
            }
        ],
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
                loader: "style!css!autoprefixer!less"
            }
        ]
    },
    devServer: {
        contentBase: "./src"
    }
};
