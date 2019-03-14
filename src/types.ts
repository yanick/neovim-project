export type Ignore = { type: 'ignore', ignore: string };
export type Missing = { type: 'missing', filename: string, path?: string };
export type Folder = { type: 'folder', short_path: string, path?: string, name: string,
        inner: InnerNode[] };
export type Comment = { type: 'comment', comment: string };
export type File = { type: 'file', path?: string, filename: string };
export type InnerNode = Ignore | Missing | Folder | Comment | File;
export type Project = { type: 'project', name: string, path: string,
    inner: InnerNode[] };
export type Node = Project | InnerNode;
