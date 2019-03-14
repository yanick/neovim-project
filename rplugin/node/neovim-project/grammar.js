// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main$ebnf$2", "symbols": ["CR"], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["project_top", "main$ebnf$1", {"literal":"}"}, "main$ebnf$2"], "postprocess": 
        ([top, inner]) => ({
            ...top,
            inner
        })
        },
    {"name": "line$subexpression$1", "symbols": ["ignore"]},
    {"name": "line$subexpression$1", "symbols": ["file_line"]},
    {"name": "line$subexpression$1", "symbols": ["comment"]},
    {"name": "line$subexpression$1", "symbols": ["folder"]},
    {"name": "line$subexpression$1", "symbols": ["missing"]},
    {"name": "line", "symbols": ["line$subexpression$1"], "postprocess": 
        data => data[0][0] },
    {"name": "ignore$string$1", "symbols": [{"literal":"#"}, {"literal":"!"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ignore", "symbols": ["_", "ignore$string$1", "__", "path", "_", "CR"], "postprocess": 
        ([  ,   ,  , ignore     ]) => ({
             type: "ignore",
             ignore
         })
        },
    {"name": "missing$string$1", "symbols": [{"literal":"#"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "missing", "symbols": ["_", "missing$string$1", "__", "path", "_", "CR"], "postprocess": 
        data => ({
            type: "missing",
            filename: data[3],
        })
        },
    {"name": "folder$string$1", "symbols": [{"literal":"F"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "folder$ebnf$1", "symbols": []},
    {"name": "folder$ebnf$1", "symbols": ["folder$ebnf$1", "line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "folder", "symbols": ["_", "path", "__", "folder$string$1", "path", "__", {"literal":"{"}, "CR", "folder$ebnf$1", "_", {"literal":"}"}, "CR"], "postprocess": 
        data => ({
            type: "folder",
            name: data[1],
            short_path: data[4],
            inner: data[8],
        })
        },
    {"name": "comment$ebnf$1", "symbols": [/[^\n]/]},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment", "symbols": ["_", {"literal":"#"}, /[^!\?]/, "comment$ebnf$1", "CR"], "postprocess": 
        data => ({
            type: 'comment',
            comment: data[2] + data[3].join('')
        })
        },
    {"name": "file_line", "symbols": ["_", "path", "_", "CR"], "postprocess": 
        data => ({
            type: "file",
            filename: data[1]
        })
        },
    {"name": "project_top$string$1", "symbols": [{"literal":"p"}, {"literal":"r"}, {"literal":"o"}, {"literal":"j"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "project_top$string$2", "symbols": [{"literal":"C"}, {"literal":"D"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "project_top", "symbols": ["project_top$string$1", "path", "__", "project_top$string$2", "path", "__", {"literal":"{"}, "CR"], "postprocess": 
            (data) =>({
        type: 'project',
                  name: data[1],
                  path: data[4],
             })
        },
    {"name": "path$ebnf$1", "symbols": [/[\w\/.\\-]/]},
    {"name": "path$ebnf$1", "symbols": ["path$ebnf$1", /[\w\/.\\-]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "path", "symbols": ["path$ebnf$1"], "postprocess": ([word]) => word.join('')},
    {"name": "__$ebnf$1", "symbols": [/[ \t]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ \t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ \t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "CR", "symbols": [{"literal":"\n"}]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
