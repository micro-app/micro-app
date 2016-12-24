'use strict';

let fs = require('fs');
let path = require('path');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const entry = require('./webpack.entry.json');
const packageJson = require('../package.json');

const alias = {
    'micro-app' : path.join(__dirname, '../src/entry/micro-app.js'),
};
const imageSize = 10240;
const constant = {
    NAME : packageJson.name,
    VERSION : packageJson.version,
};

let config = {
    devtool : '#source-map',
    entry,
    output : {
        filename : '[name].js',
        publicPath : '',
    },
    extensions : ['.vue', '.js', '.coffee', '.json', '.scss'],
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
                test : /\.html$/,
                loader : 'raw',
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
            {
                test : /\.coffee/,
                loader : 'coffee',
            },
            {
                test : /\.(coffee\.md|litcoffee)$/,
                loader : 'coffee?literate',
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
            '/' : {
                bypass ( req, res ) {
                    if (/^\/micro-app\.js($|\?)/.test(req.url)) {
                        let file = path.join(__dirname, '../dist/micro-app.js');
                        if (fs.existsSync(file)) {
                            res.writeHead(200, { 'Content-Type' : 'application/x-javascript' });
                            res.end(fs.readFileSync(file, 'utf8'));
                        } else {
                            return req.url;
                        }
                    } else {
                        return req.url;
                    }
                },
            },
        },
    },
};

module.exports = config;
