const _ = require('lodash');
const nearley = require("nearley");
const grammar = require("./grammar.js");
const { resolve, relative } = require('path');

const { readFile, readdir } = require('fs').promises;

// Create a Parser object from our grammar.

async function updateProject(project) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(project);
    const tree = parser.results[0];
    expandNode(tree);

    const onDisk = await readAll( tree.path, tree.inner.filter( c => c.type === 'ignore' ).map( c => c.ignore ) );

    const inProject = projectFiles( tree, tree.path );

    const toAdd = _.difference( onDisk, inProject );
    const goneMissing = _.difference( inProject, onDisk );

    toAdd.forEach( file => addNewFile( tree, file ) );
    markMissing(tree,goneMissing);

    console.log( printProject(tree).join("\n") );
}

function addNewFile( node, file ) {
    console.log(file);
    const candidates = node.inner.filter( c => c.type === 'folder' )
        .filter( c => ! /^\./.test( c.short_path ) )
        .filter( c => !/^\./.test( relative(c.path,file) ) );

    console.log(candidates);
    if( candidates.length === 0 ) {
        node.inner.push({
            type: 'file',
            filename: relative( node.path, file ),
        });
    }
    else {
        const winner = _.last( _.sortBy(
            candidates, c => c.path.length
        ));
        addNewFile(winner, file);
    }

}

function expandNode( node, path = null ) {
    if( node.type === 'project' ) {
        path = node.path;

        node.inner.forEach(  i => expandNode(i,path) );
    }

    if( node.type === 'missing' ) {
        node.type = 'file';
    }

    if( node.type === 'file' ) {
        node.path = resolve( path, node.filename );
    }


    if( node.type === 'folder' ) {
        node.path = resolve( path, node.short_path );
        node.inner.forEach(  i => expandNode(i,node.path) );
    }

}

function markMissing( node, goneMissing ) {
    if( !node.inner ) return;

    node.inner.forEach( child => {
        if( child.type === 'file' ) {
            if( goneMissing.includes( child.path ) ) {
                child.type = 'missing';
            }
        }
        else if( child.type === 'folder' ) {
            markMissing( child, goneMissing );
        }
    });


}

readFile('./samples/self.project', { encoding: 'utf8' }).then( doc => {
    updateProject(doc);
}
)

async function readAll( dir, toSkip = [] ) {
    let children = await readdir( dir, { withFileTypes: true } );
    children.forEach( c => c.fullname = resolve( dir, c.name ) );

    children = children.filter( c => !c.fullname.match(toSkip.join('|')) )

    return _.flattenDeep( [
        children.filter( c => c.isFile() ).map( c => c.fullname ),
        await Promise.all( children.filter( c=> c.isDirectory() ).map(
            dir => readAll(dir.fullname, toSkip )
        ))
    ])

}

// readAll('.', [ 'node_modules', '\.git/' ]).then( c => console.log(c) );


function projectFiles(node, root_path = []) {
    if( node.type === 'project' ) {
        return _.flattenDeep(
             ( node.inner ? node.inner.map( i => projectFiles(i, [ node.path ] ) ) : [] ),
        );
    }

    if( node.type === 'file' ) {
        return resolve( ...root_path, node.filename )
    }

    if( node.ignore ) {
        return []
    }

    if( node.type === 'missing' ) {
        return []
    }

    if( node.comment ) {
        return []
    }

    if( node.type === 'folder' ) {
        const { short_path, inner } = node;
        return [
            inner.map( i => projectFiles( i, [...root_path,short_path] ) ),
        ]
    }

    return 'TODO ' + node.type;
}


function printProject( node, indent = '' ) {
    if( node.type === 'project' ) {
        return _.flattenDeep([ `project=${ node.name } CD=${node.path} {`,
             ( node.inner ? node.inner.map( i => printProject(i, indent + '  ' ) ) : [] ),
            '}'
        ]);
    }

    if( node.type === 'file' ) {
        return [ indent + node.filename ]
    }

    if( node.ignore ) {
        return [ indent + '#! ' + node.ignore ]
    }

    if( node.type === 'missing' ) {
        return [ indent + '#? ' + node.filename ]
    }

    if( node.comment ) {
        return [ indent + '#' + node.comment ]
    }

    if( node.type === 'folder' ) {
        const { name, short_path, inner } = node;
        return [
            indent + name + ' Files=' + short_path + ' {',
            inner.map( i => printProject( i, indent + '  ' ) ),
            indent + '}'
        ]
    }

    return 'TODO ' + node.type;
}
