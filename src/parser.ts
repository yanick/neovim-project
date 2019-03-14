import {Project} from './types';

// @format

export function projectParser() {
  const grammar = require('./grammar.js');
  const nearley = require('nearley');

  return new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
}

export function parseProject(doc: string): Project {
  const parser = projectParser();

  parser.feed(doc);

  return parser.results[0];
}
