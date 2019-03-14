import * as _ from 'lodash';

import { Project, InnerNode, Ignore } from "./types";
import { gatherDiskFiles } from "./gatherDiskFiles";
import { projectFiles } from "./projectFiles";
import { addNewFile } from './addNewFile';
import { markMissing } from './markMissing';

export
async function updateProject(project: Project): Promise<Project> {

    const onDisk = await gatherDiskFiles(
        project.path,
        project.inner.filter( (c:InnerNode) => c.type === 'ignore' ).map(
                (c:any) => c.ignore )
    );

    const inProject = projectFiles( project );

    const toAdd = _.difference( onDisk, inProject );
    const goneMissing = _.difference( inProject, onDisk );

    project = toAdd.reduce( ( project, file ) => addNewFile( project as Project, file ), project );

    return markMissing(goneMissing)(project);
}
