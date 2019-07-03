const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const SOURCE_DIR = path.join(__dirname, 'src/renderer');
const BUILD_DIR = path.join(__dirname, 'build');
const SERVER_BASE_DIR = BUILD_DIR;

const isDevelopment = process.env.NODE_ENV !== 'production';
const devServerPort = 9000;

module.exports = {
    entry: path.join(SOURCE_DIR, 'renderer.js'),
    output: {
        path: BUILD_DIR,
        filename: 'renderer.js',
    },
    devtool: 'source-map',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SOURCE_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
                    },
                },
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                            },
                            url: false,
                            importLoaders: 2,
                            sourceMap: isDevelopment,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [postcssPresetEnv()],
                            sourceMap: isDevelopment,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: isDevelopment,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    devServer: {
        contentBase: SERVER_BASE_DIR,
        //publicPath: '/assets/',
        watchContentBase: true,
        compress: true,
        port: devServerPort,
    },
};
