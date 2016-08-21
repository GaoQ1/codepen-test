const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = '1.dotted.menu';

module.exports = {
    devServer: {
        inline: true,
        contentBase: base+"/dist/",
        port: 3000
    },
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, base, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, base, 'dist/'),
        filename: 'js/bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins:[ "transform-runtime",
                        'transform-class-properties'
                    ]
                }
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!sass-loader')
            },
            {   test: /\.(jpe?g|png|jpg|eot|woff|ttf|svg|gif)$/,
                loader: "file-loader?name=./img/[name].[ext]?[hash]"
            },
            {
                test: /\.(jpe?g|jpg|png|gif|svg)$/i,
                loader: 'img?minimize&progressive=true&optimizationLevel=5'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css", { allChunks: true }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: base+ "/src/index.html",
            hash: true
        })
    ]
};