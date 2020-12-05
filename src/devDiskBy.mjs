// -*- coding: utf-8, tab-width: 2 -*-

import mustBe from 'typechecks-pmb/must-be';


function lc(s) { return String(s).toLowerCase(); }
function translateExactBy(m, b) { return '/dev/disk/by-' + lc(m && b) + '/'; }


const shortBys = {
  L: 'label',
  PL: 'partlabel',
  PU: 'partuuid',
  U: 'uuid',
};
function translateShortBy(m, p) {
  return '/dev/disk/by-' + mustBe.nest('Translation of disk device prefix "'
    + m + '"', shortBys[p]) + '/';
}


function devDiskBy(orig) {
  let dev = orig;
  if (!/:|=|\//.test(dev)) { dev = 'PL:' + dev; }
  dev = dev.replace(/^([A-Z]+)=/, translateExactBy);
  dev = dev.replace(/^([A-Z]+):/, translateShortBy);
  return dev;
}


export default devDiskBy;
