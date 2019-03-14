import { resolve } from "path";
import * as _ from 'lodash';

const { readFile, readdir } = require('fs').promises;

export
async function gatherDiskFiles( dir: string, toSkip :string[] = [] ): Promise<string[]> {
    let children = await readdir( dir, { withFileTypes: true } );

    const skipRegex = toSkip.join('|');

    children = children.map( (c:any) => ({
        type: ( c.isFile() ? 'file' : c.isDirectory() ? 'directory' : 'other' ),
        fullname: resolve(dir,c.name)
    }) ).filter( ({fullname}:any) => !fullname.match(skipRegex) ) ;

    return Promise.all(
        children.map( ({ type, fullname }: any) => type === 'file' ? [fullname] : type === 'directory' ?
            gatherDiskFiles(fullname, toSkip ) : []
        ) as any
    ).then(_.flatten) as any
}
