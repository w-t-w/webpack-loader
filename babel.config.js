const babelConfig = {
    presets: [[
        "@babel/preset-env",
        {
            loose: false,
            modules: false,
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ]]
};

module.exports = babelConfig;