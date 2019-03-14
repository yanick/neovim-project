// @format

import * as _ from 'lodash';
import u from 'updeep';
import {Folder, Project, InnerNode} from './types';
import {relative} from 'path';

export function addNewFile<N extends Project | Folder>(
  node: N,
  file: string,
): N {
  const candidates = node.inner
    .filter(c => c.type === 'folder')
    .filter((c: any) => !/^\./.test(c.short_path))
    .filter((c: any) => {
      return !/^\./.test(relative(c.path, file));
    });

  if (candidates.length === 0) {
    return u(
      {
        inner: (inner: InnerNode[]) => [
          {
            type: 'file',
            path: file,
            filename: relative((node as any).path, file),
          },
          ...inner,
        ],
      },
      node,
    );
  }

  const winner = _.last(_.sortBy(candidates, c => (c as any).path.length));

  return u(
    {
      inner: u.map(
        u.if(
          (s: InnerNode) => (s as any).name === (winner as any).name,
          (s: Folder) => addNewFile(s, file),
        ),
      ),
    },
    node,
  );
}
