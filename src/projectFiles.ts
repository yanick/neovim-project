import * as _ from 'lodash';
import { Node } from './types';
import { resolve } from 'path';

export
function projectFiles(node: Node, root_path : string[] = [] ): string[] {

    switch( node.type ) {

        case 'project':
            return _.flattenDeep(
             node.inner.map( (i:Node) => projectFiles(i, [ node.path ] ) ) as any
        );

        case 'file':
            return ( resolve as any )( ...root_path, node.filename )

        case 'folder':
            const { short_path, inner } = node;
            return inner.map( i => projectFiles( i, [...root_path,short_path ]  ) ) as any;


        default: return [];

    }

}


