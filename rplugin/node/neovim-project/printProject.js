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
function printProject(node, indent) {
    if (indent === void 0) { indent = ''; }
    switch (node.type) {
        case 'project':
            return _.flattenDeep(["project=" + node.name + " CD=" + node.path + " {",
                node.inner.map(function (i) { return printProject(i, indent + '  '); }),
                '}'
            ]);
        case 'file':
            return [indent + node.filename];
        case 'ignore': return [indent + '#! ' + node.ignore];
        case 'missing': return [indent + '#? ' + node.filename];
        case 'comment': return [indent + '# ' + node.comment];
        case 'folder':
            var name = node.name, short_path = node.short_path, inner = node.inner;
            return _.flatten([
                indent + name + ' Files=' + short_path + ' {',
                inner.map(function (i) { return printProject(i, indent + '  '); }),
                indent + '}'
            ]);
        default:
            return [];
    }
}
exports.printProject = printProject;
