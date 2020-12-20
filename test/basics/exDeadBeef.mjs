// -*- coding: utf-8, tab-width: 2 -*-

import mergeOpt from 'merge-options';

import tu from '../testUtil';
import exBackup from './exBackup';

const input = 'U:dead-beef';

const wantsDict = mergeOpt(exBackup.wantsDict, {
  mptDir: { path: '/mnt/dead-beef' },
  mount: {
    path: 'mnt-dead\\x2dbeef',
    content: {
      Mount: {
        What:     '/dev/disk/by-uuid/dead-beef',
        Where:    '/mnt/dead-beef',
      },
    },
  },
  devDetect: {
    path: 'dev-disk-by\\x2duuid-dead\\x2dbeef.device',
    pathSuf: '.wants/mnt-dead\\x2dbeef.mount',
  },
  autoMount: {
    path: 'mnt-dead\\x2dbeef',
  },
  enableAutoMount: { pathSuf: '.wants/mnt-dead\\x2dbeef.automount' },
});

const EX = tu.simpleTestSpec(import.meta, input, wantsDict, {
  idx: 2,
});

export default EX;
