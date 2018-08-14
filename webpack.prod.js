const webpack               = require('webpack');
const merge                 = require('webpack-merge');
const common                = require('./webpack.common.js');
const MinifyPlugin          = require("babel-minify-webpack-plugin");
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const path                  = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = merge(common, {
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: { minimize: true },
                    },
                }),
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
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: { minimize: true },
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
                }),
            }
        ],
    },
    plugins: [
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new ExtractTextPlugin("styles.css"),
        extractSass,
    ],
});