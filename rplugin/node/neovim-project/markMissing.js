"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var updeep_1 = __importDefault(require("updeep"));
var _ = __importStar(require("lodash"));
exports.markMissing = function (goneMissing) {
    var isMissing = function (path) { return goneMissing.includes(path); };
    var mark = updeep_1.default.map(updeep_1.default.if(updeep_1.default.is('type', 'file'), updeep_1.default.if(function (_a) {
        var path = _a.path;
        return isMissing(path);
    }, { type: 'missing' })));
    var recurse = updeep_1.default.map(updeep_1.default.if(updeep_1.default.is('type', 'folder'), function (folder) { return exports.markMissing(goneMissing)(folder); }));
    return updeep_1.default({ inner: updeep_1.default.if(_.identity, _.flow([mark, recurse])) });
};
