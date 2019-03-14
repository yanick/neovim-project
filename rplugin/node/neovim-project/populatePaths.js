"use strict";
// @format
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var updeep_1 = __importDefault(require("updeep"));
var path_1 = require("path");
function populatePaths(node, path) {
    switch (node.type) {
        case 'project':
            return updeep_1.default({
                inner: updeep_1.default.map(function (n) { return populatePaths(n, node.path); }),
            }, node);
        case 'missing':
        case 'file':
            return updeep_1.default(function (f) { return (__assign({}, f, { type: 'file', path: path_1.resolve(path, f.filename) })); })(node);
        case 'folder':
            var p_1 = path_1.resolve(path, node.short_path);
            return updeep_1.default({ path: p_1, inner: updeep_1.default.map(function (i) { return populatePaths(i, p_1); }) }, node);
        default:
            return node;
    }
}
exports.populatePaths = populatePaths;
