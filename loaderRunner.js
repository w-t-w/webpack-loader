const path = require('path');
const fs = require('fs');
const loaderRunner = require('loader-runner');

loaderRunner.runLoaders({
    resource: path.resolve(process.cwd(), './src/styles/index.css'),
    loaders: [{
        loader: path.resolve(process.cwd(), './loaders/test-loader.js'),
        options: {
            path: path.resolve(process.cwd(), './src/styles'),
            name: 'sprite'
        }
    }],
    context: {minimize: true},
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    if (err) {
        console.error(err);
    }
    console.log(result);
});