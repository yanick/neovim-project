"use strict";
// @format
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var updateProject_1 = require("./updateProject");
var printProject_1 = require("./printProject");
var parser_1 = require("./parser");
var makeSection_1 = require("./makeSection");
var populatePaths_1 = require("./populatePaths");
function projectRefresh(_a) {
    var _this = this;
    var nvim = _a.nvim;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var buffer, lines, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nvim.buffer];
                case 1:
                    buffer = _a.sent();
                    return [4 /*yield*/, buffer.lines];
                case 2:
                    lines = _a.sent();
                    project = parser_1.parseProject(lines.join('\n'));
                    if (!project)
                        throw new Error('parsing failed');
                    return [4 /*yield*/, updateProject_1.updateProject(populatePaths_1.populatePaths(project))];
                case 3:
                    project = _a.sent();
                    buffer.replace(printProject_1.printProject(project), 0);
                    return [2 /*return*/];
            }
        });
    }); };
}
function projectSection(_a) {
    var _this = this;
    var nvim = _a.nvim;
    return function (args, _a) {
        var start = _a[0], end = _a[1];
        return __awaiter(_this, void 0, void 0, function () {
            var buffer, lines;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, nvim.buffer];
                    case 1:
                        buffer = _b.sent();
                        return [4 /*yield*/, buffer.getLines({
                                start: start - 1,
                                end: end,
                                strictIndexing: false,
                            })];
                    case 2:
                        lines = _b.sent();
                        return [2 /*return*/, buffer.setLines(makeSection_1.makeSection(lines), { start: start - 1, end: end })];
                }
            });
        });
    };
}
exports.default = (function (plugin) {
    plugin.registerCommand('ProjectRefresh', projectRefresh(plugin));
    plugin.registerFunction('ProjectSection', projectSection(plugin), { range: true });
});
