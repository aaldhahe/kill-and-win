'use strict';

const NODE_ENV = process.env.NODE_ENV;

module.exports = function (env) {
    return {
        NODE_ENV: !NODE_ENV ? env : NODE_ENV
    };
};
