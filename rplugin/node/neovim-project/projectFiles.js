"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var path_1 = require("path");
function projectFiles(node, root_path) {
    if (root_path === void 0) { root_path = []; }
    switch (node.type) {
        case 'project':
            return _.flattenDeep(node.inner.map(function (i) { return projectFiles(i, [node.path]); }));
        case 'file':
            return path_1.resolve.apply(void 0, root_path.concat([node.filename]));
        case 'folder':
            var short_path_1 = node.short_path, inner = node.inner;
            return inner.map(function (i) { return projectFiles(i, root_path.concat([short_path_1])); });
        default: return [];
    }
}
exports.projectFiles = projectFiles;
