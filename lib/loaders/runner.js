const {resolve} = require('path');
const {writeFile} = require('fs');
const {getOptions} = require('loader-utils');

function runner(source) {
    // const params = getOptions(this);
    // console.log(params);
    // return source.split('').join('~');
    // this.callback(null, source.split('').join('~'));
    // this.cacheable(false);
    // const {name} = getOptions(this);
    // const callback = this.async();
    // writeFile(resolve(process.cwd(), 'build', `${name}.txt`), source.split('').join('~'), () => {
    //     callback(null, source);
    // });
    // this.emit();

}

module.exports = runner;