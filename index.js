'use strict';

var buble = require('buble');
var path = require('path');

module.exports = function BubleLoader(source, inputSourceMap) {
    try {
        var transformed = buble.transform(source, {
            transforms: {
                modules: false
            }
        });
    } catch (e) {
        this.emitError(e)
        return
    }
    var resourcePath = this.resourcePath;

    transformed.map.file = resourcePath;
    transformed.map.sources[0] = path.relative(process.cwd(), resourcePath);
    transformed.map.sourceRoot = process.cwd();

    this.cacheable && this.cacheable();
    this.callback(null, transformed.code, transformed.map);
};
