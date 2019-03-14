// @format

const {readFile, readdir} = require('fs').promises;
import {updateProject} from './updateProject';
import {parseProject} from './parser';
import {populatePaths} from './populatePaths';
import {printProject} from './printProject';

const spy = (stuff: any) => {
  console.log(stuff);
  return stuff;
};

readFile(process.argv[2], {encoding: 'utf8'})
  .then(parseProject)
  .then(populatePaths)
  .then(updateProject)
  .then(spy)
  .then(printProject)
  .then((lines: string[]) => lines.forEach(l => console.log(l)));
