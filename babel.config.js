const babelConfig = {
    presets: [[
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true
            },
            modules: false,
            loose: false
        }
    ]]
};

module.exports = babelConfig;