import * as _ from 'lodash';
import { Node } from './types';

export function printProject( node: Node, indent = '' ): string[] {
    switch( node.type ) {
        case 'project':
            return _.flattenDeep([ `project=${ node.name } CD=${node.path} {`,
                node.inner.map( i => printProject(i, indent + '  ' ) ),
                '}'
            ] as any);
        case 'file':
            return [ indent + node.filename ]

        case 'ignore': return [ indent + '#! ' + node.ignore ]
        case 'missing': return [ indent + '#? ' + node.filename ]
        case 'comment': return [ indent + '# ' + node.comment ]

        case 'folder':
            const { name, short_path, inner } = node;
            return _.flatten( [
                indent + name + ' Files=' + short_path + ' {',
                inner.map( i => printProject( i, indent + '  ' ) ),
                indent + '}'
            ] as any);

        default:
            return [];
    }
}
