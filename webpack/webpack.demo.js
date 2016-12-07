'use strict';

let fs = require('fs');
let path = require('path');
let yargs = require('yargs');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const entry = require('./webpack.entry.json');
const packageJson = require('../package.json');

const alias = (() => {
    const aliasPath = path.join(__dirname, '../src/entry');
    let alias = {};
    fs.readdirSync(aliasPath).forEach(( filename ) => {
        let file = path.join(aliasPath, filename);
        if (fs.statSync(file).isFile() && path.extname(file) == '.js') {
            alias[path.basename(filename, '.js')] = file;
        }
    });
    return alias;
})();
const imageSize = 10240;
const constant = {};

let config = {
    devtool : '#source-map',
    entry,
    output : {
        filename : '[name].js',
        publicPath : '',
    },
    extensions : ['.vue', '.js', '.json', '.scss'],
    resolve : {
        alias,
    },
    module : {
        loaders : [
            {
                test : /\.vue$/,
                loader : 'vue',
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader : `url?limit=${ imageSize }&name=../img/[name].[ext]?[hash]`,
            },
            {
                test : /\.css$/,
                loader : ExtractTextWebpackPlugin.extract('style', 'css!postcss'),
            },
            {
                test : /\.scss$/,
                loader : ExtractTextWebpackPlugin.extract('style', 'css!postcss!sass'),
            },
            {
                test : /\.js$/,
                exclude : path.join(__dirname, '../node_modules/'),
                loader : 'babel',
                query : {
                    presets : ['es2015', 'stage-0'],
                    // plugins : ['transform-remove-strict-mode'],
                    // plugins: ['transform-runtime'],
                },
            },
        ],
    },
    plugins : [
        new ExtractTextWebpackPlugin('[name].css'),
        new webpack.DefinePlugin((() => {
            Object.keys(constant).forEach(( key ) => {
                constant[key] = JSON.stringify(constant[key]);
            });
            return {
                'process.env' : constant,
            };
        })()),
    ],
    vue : {
        loaders : {
            sass : ExtractTextWebpackPlugin.extract('style', 'css!postcss!sass'),
            scss : ExtractTextWebpackPlugin.extract('style', 'css!postcss!sass'),
        },
    },
    postcss () {
        return [autoprefixer({ browsers : ['last 2 versions'] })];
    },
    devServer : {
        proxy : {
            '/dist' : {
                target : `http://localhost:${ yargs.argv.port + 1 }/`,
                changeOrigin : true,
                pathRewrite : {
                    '^/dist' : ''
                },
            },
        },
    },
};

module.exports = config;
