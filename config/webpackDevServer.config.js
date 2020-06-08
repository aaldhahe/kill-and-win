'use strict';

const paths = require('./paths');

module.exports = function (config) {
    return {
        contentBase: config.contentBase ? config.contentBase : paths.appBuild,
        hot: true,
        compress: true,
        quiet: true,
        publicPath: paths.publicUrlOrPath,
        historyApiFallback: {
            disableDotRule: true
        }
    };
};
