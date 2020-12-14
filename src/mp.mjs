// -*- coding: utf-8, tab-width: 2 -*-

import flatten from 'flatten';

import parseRichMount from './parseRichMount';

const EX = function describeSystemdAutoMountPoint(spec, bun) {
  if (!spec) { throw new Error('No spec given!'); }
  const files = (spec.forEach
    ? flatten([].concat(spec).map(parseRichMount))
    : parseRichMount(spec));
  if (bun && bun.needs) {
    return Object.assign(bun.needs('admFile', files), { specs: files });
  }
  return files;
};

export default EX;
