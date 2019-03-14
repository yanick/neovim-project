
export
function makeSection( lines: string[] ): string[] {
    if( lines.length === 0 ) return [];

    const [ indent ] = ( lines[0].match( /^\s*/ ) as [ string ] );

    lines = lines.map ( l => l.replace( /^\s+/, '' ) );

    const segments = lines[0].split('/');
    segments.pop();
    const common = [];

    while( lines.every( l => l.startsWith( segments[0] + '/' ) ) ) {
        lines = lines.map( l => l.replace( /^.*?\//, '' ) );
        common.push(segments.shift() );
    }

    const dir = common.join('/');

    return [
        `${dir} Files=${dir} {`,
        ...( lines.map( l => '  ' + l ) ),
        '}'
    ].map( l => indent + l );

}
