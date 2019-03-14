// @format

import {NvimPlugin, Neovim} from 'neovim';
import {updateProject} from './updateProject';
import {printProject} from './printProject';
import {projectParser, parseProject} from './parser';
import {makeSection} from './makeSection';
import {populatePaths} from './populatePaths';
import {Project} from './types';

function projectRefresh({nvim}: NvimPlugin) {
  return async () => {
    const buffer = await nvim.buffer;

    const lines = await buffer.lines;

    let project = parseProject(lines.join('\n'));

    if (!project) throw new Error('parsing failed');

    project = await updateProject(populatePaths(project) as Project);

    buffer.replace(printProject(project), 0);
  };
}

function projectSection({nvim}: NvimPlugin) {
  return async (args: any, [start, end]: [number, number]) => {
    let buffer = await nvim.buffer;
    let lines = await buffer.getLines({
      start: start - 1,
      end,
      strictIndexing: false,
    });

    return buffer.setLines(makeSection(lines), {start: start - 1, end});
  };
}

export default (plugin: NvimPlugin) => {
  plugin.registerCommand('ProjectRefresh', projectRefresh(plugin));
  plugin.registerFunction(
    'ProjectSection',
    projectSection(plugin) as any,
    {range: true} as any,
  );
};
