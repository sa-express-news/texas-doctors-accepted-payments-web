const merge     = require('webpack-merge');
const common    = require('./webpack.common.js');
const webpack   = require('webpack');
const path      = require('path');

module.exports = merge(common, {
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'tmp'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './tmp',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: "handlebars-loader",
                query: {
                    partialDirs: [
                        path.join(__dirname, 'src/templates', 'partials')
                    ],
                    helperDirs: [
                        path.join(__dirname, 'src/templates', 'helpers')
                    ],
                    inlineRequires: '\/images\/',
                },
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});