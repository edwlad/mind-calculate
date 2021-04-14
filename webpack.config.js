const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
//const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = {
    entry: './app/app.jsx',
    output: {
        path: path.resolve(__dirname, 'pub'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                //use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    //name: '[hash].[name].[ext]',
                    name: '[name].[ext]',
                    outputPath: 'files/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    //name: '[hash].[name].[ext]',
                    name: '[name].[ext]',
                    outputPath: 'font/'
                }
            }

        ]
    },
    devServer: {
        publicPath: '/',
        compress: true,
        port: 9000,
        contentBase: path.join(__dirname, 'pub')
    },
    plugins: [
        //new BitBarWebpackProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: 'app/nabor/*.txt', to: "nabor/[name][ext]" },
              { from: 'app/*.php', to: "[name][ext]" },
            ],
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            //maxSize: 300000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            cacheGroups: {
                mui: {
                    test: /[\\/]node_modules[\\/](@material-ui).+/,
                    priority: -1,
                    filename: 'mat-ui.js'
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|redux).+/,
                    priority: -2,
                    filename: 'react.js'
                },
                other: {
                    priority: -10,
                    filename: 'bundle.js'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    //watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        // in ms aggregates multiple changes to a single rebuild
        //poll: true,
        //poll: 500, 
        // interval in ms
        // enables polling mode for watching
        // must be used on filesystems that doesn't notify on change
        // i. e. nfs shares
    }


}
