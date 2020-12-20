// -*- coding: utf-8, tab-width: 2 -*-

import mergeOpt from 'merge-options';

import tu from '../testUtil';
import exBackup from './exBackup';

const input = 'L:video';

const wantsDict = mergeOpt(exBackup.wantsDict, {
  mptDir: { path: '/mnt/video' },
  mount: {
    path: 'mnt-video',
    content: {
      Mount: {
        What:     '/dev/disk/by-label/video',
        Where:    '/mnt/video',
      },
    },
  },
  devDetect: {
    path: 'dev-disk-by\\x2dlabel-video.device',
    pathSuf: '.wants/mnt-video.mount',
  },
  autoMount: {
    path: 'mnt-video',
  },
  enableAutoMount: { pathSuf: '.wants/mnt-video.automount' },
});

const EX = tu.simpleTestSpec(import.meta, input, wantsDict);

export default EX;
