"use strict";
// @format
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('fs').promises, readFile = _a.readFile, readdir = _a.readdir;
var updateProject_1 = require("./updateProject");
var parser_1 = require("./parser");
var populatePaths_1 = require("./populatePaths");
var printProject_1 = require("./printProject");
var spy = function (stuff) {
    console.log(stuff);
    return stuff;
};
readFile(process.argv[2], { encoding: 'utf8' })
    .then(parser_1.parseProject)
    .then(populatePaths_1.populatePaths)
    .then(updateProject_1.updateProject)
    .then(spy)
    .then(printProject_1.printProject)
    .then(function (lines) { return lines.forEach(function (l) { return console.log(l); }); });
