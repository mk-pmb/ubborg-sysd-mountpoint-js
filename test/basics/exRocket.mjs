// -*- coding: utf-8, tab-width: 2 -*-

import mergeOpt from 'merge-options';

import tu from '../testUtil';
import exBackup from './exBackup';

const descr = 'Random orbit cyber-killer enchanting trajectory';

const input = {
  device: 'ID=dm-name-rocket',
  descr,
  mountAt: '/opt/rocket',
  fsType: 'vfat',
  fsOpt: {
    defaults: null,
    atime:    false,
    gid:      'adm',
    dmask:    '0002',
    fmask:    '0113',
    fail:     false,
  },
  mountOnDemand: true,
  idleSec: '10 min',
};

const wantsDict = mergeOpt(exBackup.wantsDict, {
  mptDir: '/opt/rocket/',
  mount: {
    path: 'opt-rocket',
    content: {
      Unit: {
        Description: descr,
      },
      Mount: {
        What: '/dev/disk/by-id/dm-name-rocket',
        Where: '/opt/rocket',
        Type: 'vfat',
        Options: 'defaults,noatime,dmask=0002,nofail,fmask=0113,gid=adm',
      },
    },
  },
  devDetect: {
    path: 'dev-disk-by\\x2did-dm\\x2dname\\x2drocket.device',
    pathSuf: '.wants/opt-rocket.mount',
  },
  autoMount: {
    ...tu.mtUnit,
    path: 'opt-rocket',
    content: {
      ...tu.unitDefaults,
      Automount: {
        TimeoutIdleSec: '10 min',
      },
    },
  },
});

const EX = tu.simpleTestSpec(import.meta, input, wantsDict, {
  idx: 3,
});

export default EX;
