"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @format
function projectParser() {
    var grammar = require('./grammar.js');
    var nearley = require('nearley');
    return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
}
exports.projectParser = projectParser;
function parseProject(doc) {
    var parser = projectParser();
    parser.feed(doc);
    return parser.results[0];
}
exports.parseProject = parseProject;
