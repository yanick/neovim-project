main ->  project_top line:* "}" CR:? {%
    ([top, inner]) => ({
        ...top,
        inner
    })
%}

line -> ( ignore | file_line | comment | folder | missing ) {%
    data => data[0][0] %}

ignore -> _ "#!" __ path _ CR {%
       ([  ,   ,  , ignore     ]) => ({
            type: "ignore",
            ignore
        })
%}

missing -> _ "#?" __ path _ CR {%
data => ({
    type: "missing",
    filename: data[3],
})
%}

folder -> _ path __ "Files=" path __ "{" CR line:* _ "}" CR {%
data => ({
    type: "folder",
    name: data[1],
    short_path: data[4],
    inner: data[8],
})
%}

comment -> _ "#" [^!\?] [^\n]:+ CR {%
    data => ({
        type: 'comment',
        comment: data[2] + data[3].join('')
    })
%}

file_line -> _ path _ CR {%
    data => ({
        type: "file",
        filename: data[1]
    })
%}

project_top -> "project=" path __ "CD=" path __ "{" CR {%
    (data) =>({
type: 'project',
          name: data[1],
          path: data[4],
     })
%}

path -> [\w\/.\\-]:+ {% ([word]) => word.join('') %}

__ -> [ \t]:+

_ -> [ \t]:*

CR -> "\n"
