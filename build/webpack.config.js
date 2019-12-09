const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';


const config = {
    //webpack4需要的mode属性,development||production
    mode: process.env.NODE_ENV || "production",
    target: 'web',
    entry: path.join(__dirname, '../test/test.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                //连接.babelrc文件来进行es6转换
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlPlugin({
            template: 'index.html'
        }),
        //vue-loader15版本起，需要引入这个插件
    ]
};

if (isDev) {
    config.devServer = {
        port: '8000',
        host: '127.0.0.1',
        overlay: {
            errors: true,
        },
        hot: true,
        inline: true,
        // contentBase: './dist'
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, '../src/index.js'),
    };
}
module.exports = config;