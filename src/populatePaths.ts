// @format

import u from 'updeep';
import {resolve} from 'path';

import {InnerNode, Node, File} from './types';

export function populatePaths(node: Node, path?: string): Node {
  switch (node.type) {
    case 'project':
      return u(
        {
          inner: u.map((n: InnerNode) => populatePaths(n, node.path)),
        },
        node,
      );

    case 'missing':
    case 'file':
      return u((f: File) => ({
        ...f,
        type: 'file',
        path: resolve(path as string, f.filename),
      }))(node);

    case 'folder':
      const p = resolve(path as string, node.short_path);
      return u(
        {path: p, inner: u.map((i: InnerNode) => populatePaths(i, p))},
        node,
      );

    default:
      return node;
  }
}
