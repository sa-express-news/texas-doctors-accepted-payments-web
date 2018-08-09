const fs                    = require('fs');
const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => {
    return path.resolve(appDirectory, relativePath);
};

const getSiteTitle = () => {
    return require(resolveApp('package.json')).siteTitle;
};

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: getSiteTitle(),
            template: 'src/index.html',
        }),
    ],
};