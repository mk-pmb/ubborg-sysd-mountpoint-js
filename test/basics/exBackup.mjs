// -*- coding: utf-8, tab-width: 2 -*-

import tu from '../testUtil';

const input = 'backup';

const wantsDict = {
  mptDir: { path: '/mnt/backup', mimeType: 'dirOrMounted' },
  mount: {
    ...tu.mtUnit,
    path: 'mnt-backup',
    pathSuf: '.mount',
    content: {
      ...tu.unitDefaults,
      Mount: {
        What:     '/dev/disk/by-partlabel/backup',
        Where:    '/mnt/backup',
        Type:     'auto',
        Options:  'defaults,noatime',
      },
    },
  },
  devDetect: {
    ...tu.mtSym,
    ...tu.mtDel,
    path: 'dev-disk-by\\x2dpartlabel-backup.device',
    pathSuf: '.wants/mnt-backup.mount',
  },
  autoMount: {
    ...tu.mtUnit,
    ...tu.mtDel,
    path: 'mnt-backup',
    pathSuf: '.automount',
  },
  enableAutoMount: {
    ...tu.mtSym,
    ...tu.mtDel,
    path: 'local-fs.target',
    pathSuf: '.wants/mnt-backup.automount',
  },
};

const EX = tu.simpleTestSpec(import.meta, input, wantsDict, {
  idx: 3,
});

export default EX;
