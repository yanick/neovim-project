"use strict";
// @format
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var updeep_1 = __importDefault(require("updeep"));
var path_1 = require("path");
function addNewFile(node, file) {
    var candidates = node.inner
        .filter(function (c) { return c.type === 'folder'; })
        .filter(function (c) { return !/^\./.test(c.short_path); })
        .filter(function (c) {
        return !/^\./.test(path_1.relative(c.path, file));
    });
    if (candidates.length === 0) {
        return updeep_1.default({
            inner: function (inner) { return [
                {
                    type: 'file',
                    path: file,
                    filename: path_1.relative(node.path, file),
                }
            ].concat(inner); },
        }, node);
    }
    var winner = _.last(_.sortBy(candidates, function (c) { return c.path.length; }));
    return updeep_1.default({
        inner: updeep_1.default.map(updeep_1.default.if(function (s) { return s.name === winner.name; }, function (s) { return addNewFile(s, file); })),
    }, node);
}
exports.addNewFile = addNewFile;
