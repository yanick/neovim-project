"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeSection(lines) {
    if (lines.length === 0)
        return [];
    var indent = lines[0].match(/^\s*/)[0];
    lines = lines.map(function (l) { return l.replace(/^\s+/, ''); });
    var segments = lines[0].split('/');
    segments.pop();
    var common = [];
    while (lines.every(function (l) { return l.startsWith(segments[0] + '/'); })) {
        lines = lines.map(function (l) { return l.replace(/^.*?\//, ''); });
        common.push(segments.shift());
    }
    var dir = common.join('/');
    return [
        dir + " Files=" + dir + " {"
    ].concat((lines.map(function (l) { return '  ' + l; })), [
        '}'
    ]).map(function (l) { return indent + l; });
}
exports.makeSection = makeSection;
