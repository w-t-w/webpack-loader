const {resolve} = require('path');

const OUTPUT_DIR = resolve(process.cwd(), './build');

const a_loader = resolve(process.cwd(), './lib/loaders/a_loader.js');
const b_loader = resolve(process.cwd(), './lib/loaders/b_loader.js');

const webpackConfig = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        publicPath: '',
        filename: 'index.js',
        path: OUTPUT_DIR,
        chunkFilename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx']
    },
    stats: {
        preset: 'minimal',
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    importLoaders: 3
                }
            }, {
                loader: 'less-loader'
            }, {
                loader: a_loader
            }, {
                loader: b_loader
            }]
        }]
    }
};

module.exports = webpackConfig;