const {resolve} = require('path');
const {writeFileSync, existsSync, mkdirSync} = require('fs');
const {run} = require('spritesmith');
const {getOptions} = require('loader-utils');

function sprite_loader(source) {
    const {name, path} = getOptions(this);
    const callback = this.async();
    const imagesPatters = /url\((.*)\?__sprite\)/g;
    const images = [];
    let item = '',
        cssSource = source;
    while (item = imagesPatters.exec(source)) {
        images.push(resolve(process.cwd(), path, item[1]));
        cssSource = cssSource.replace(item[0], `url(../assets/${name}.png)`);
    }
    run({src: images}, (err, images) => {
        const {image} = images;
        const output_dir = resolve(process.cwd(), './build'),
            assets_dir = resolve(output_dir, './assets'),
            css_dir = resolve(output_dir, './css');
        if (!existsSync(output_dir)) {
            mkdirSync(output_dir, {recursive: true});
            mkdirSync(assets_dir, {recursive: true});
            mkdirSync(css_dir, {recursive: true});
        }
        writeFileSync(`${css_dir}/${name}.css`, cssSource);
        writeFileSync(`${assets_dir}/${name}.png`, image);
        callback(null, source);
    });
}

module.exports = sprite_loader;