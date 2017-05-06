const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('[name].css');


module.exports = {
    entry:"./src/index.js",   
    output:{
        path:path.resolve(__dirname,'build'),
        filename:"bundle.js",
    },
    module:{
        // loaders:[
        //     {test:/\.css$/,loader:"style!css"},
        // ],
        // loaders:[
        //     {test:/\.scss$/,loader:"style!css!sass"},不再支持简写了style-loader才行
        // ]
        loaders:  [
                {
                test: /\.css$/,
                // loader:"style.loader!css-loader",
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
                {
                test:  /\.scss$/,
                loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })//设置单独打包
            }
        ]
    },
    // devtool:"source-map",
    plugins: [
        // new ExtractTextPlugin("test.css"),
        extractCSS,
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        // new webpack.optimize.UglifyJsPlugin({//代码压缩
        //     compress: {
        //         warnings: false
        //     },
        //     sourceMap: true,//这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
        //     mangle: true
        // })
        // new webpack.DefinePlugin({
        //    'process.env': {
        //        NODE_ENV: '"production"'
        //    }
        // })
    ]
}