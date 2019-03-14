import u from 'updeep';
import * as _ from 'lodash';
import { Node, File, Folder } from './types';

export
const markMissing = ( goneMissing: string[] ): any => {

    const isMissing = (path: string) => goneMissing.includes(path);

    const mark = u.map( u.if( u.is( 'type', 'file' ),
        u.if( ({path} : File) => isMissing(path as string), { type: 'missing' } )
    ));

    const recurse = u.map( u.if( u.is( 'type', 'folder' ), ( folder: any ) => markMissing(goneMissing)(folder)
    ));

    return u({ inner: u.if( _.identity, _.flow([ mark, recurse ]) ) });
}
