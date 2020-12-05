// -*- coding: utf-8, tab-width: 2 -*-

import flatten from 'flatten';

import parseRichMount from './parseRichMount';

const EX = function describeSystemdAutoMountPoint(spec, bun) {
  const files = flatten([].concat(spec).map(parseRichMount));
  if (bun && bun.needs) {
    return Object.assign(bun.needs('admFile', files), { specs: files });
  }
  return files;
};

export default EX;
