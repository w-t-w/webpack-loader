const {getOptions} = require('loader-utils');
const {run} = require('spritesmith');
const fs = require('fs');
const path = require('path');

function TestLoader(source) {
    // const params = getOptions(this);
    // this.getOptions()
    // this.callback(null, source.split('').join('!'));
    // this.cacheable(false);
    // this.async
    // const callback = this.async();
    // fs.readFile(path.resolve(process.cwd(), './loaderRunnerAsync.txt'), 'utf-8', (err, data) => {
    //     callback(null, `${source} ${data}`.split('').join('!!'));
    // });
    // this.emit
    // return source.split('').join('~');
    const {path: _path, name = ''} = getOptions(this),
        OUTPUT_DIR = path.resolve(process.cwd(), './build'),
        ASSETS_DIR = path.resolve(process.cwd(), './build/assets'),
        spritesPatterns = /url\("?(.*)\?__sprite"?\)/g,
        callback = this.async();

    let sprites = [],
        result;
    while (result = spritesPatterns.exec(source)) {
        sprites.push(path.resolve(_path, result[1]));
    }
    run({src: sprites}, (err, image) => {
        if (err) {
            throw new Error(err);
        }
        const {image: _image} = image;
        if (fs.existsSync(OUTPUT_DIR)) {
            fs.rmSync(OUTPUT_DIR, {recursive: true, force: true});
        }
        fs.mkdirSync(OUTPUT_DIR);
        fs.mkdirSync(ASSETS_DIR);
        // 第一种方法
        // fs.writeFileSync(path.resolve(ASSETS_DIR, `${name}.png`), _image);
        // 第二种方法
        // this.emitFile(path.resolve(ASSETS_DIR, `${name}.png`), _image);
        // this.emitFile('./css/index.css', source.replace(spritesPatterns, `url("../assets/sprite.png")`));
        fs.writeFileSync(path.resolve(ASSETS_DIR, `${name}.png`), _image);
        fs.writeFileSync(path.resolve(OUTPUT_DIR, './index.css'), source.replace(spritesPatterns, `url("./assets/sprite.png")`));
        callback(null, source);
    });
}

module.exports = TestLoader;