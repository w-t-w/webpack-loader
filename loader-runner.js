const {resolve} = require('path');
const {readFile} = require('fs');
const {runLoaders} = require('loader-runner');

runLoaders({
    resource: resolve(process.cwd(), './src/styles/index.css'),
    loaders: [{
        loader: resolve(process.cwd(), './lib/loaders/sprite_loader.js'),
        options: {
            name: 'sprite',
            path: 'src/styles'
        }
    }],
    context: {minimize: true},
    readResource: readFile.bind(this)
}, (err, stats) => {
    if (err) {
        throw new Error(`测试自定义 loader 出现错误: ${err}`);
    }
    console.log(stats);
});