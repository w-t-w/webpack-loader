const path = require('path');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const OUTPUT_DIR = path.resolve(__dirname, './build');
const ALoader = path.resolve(__dirname, './loaders/a-loader.js');
const BLoader = path.resolve(__dirname, './loaders/b-loader.js');

const webpackConfig = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        publicPath: '',
        filename: '[name].[fullhash].js',
        path: OUTPUT_DIR,
        chunkFilename: '[name].[fullhash].js'
    },
    module: {
        // rules: [{
        //     test: /\.js[x]?$/,
        //     use: [{
        //         loader: ALoader
        //     }, {
        //         loader: BLoader
        //     }]
        // }]
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: ALoader
            }, {
                loader: BLoader
            }]
        }, {
            test: /\.css$/,
            use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, {
                loader: path.resolve(process.cwd(), './loaders/test-loader.js'),
                options: {
                    path: path.resolve(process.cwd(), './src/styles'),
                    name: 'sprite'
                }
            }]
        }]
    },
    plugins: [
    ]
};

module.exports = webpackConfig;