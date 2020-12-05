// -*- coding: utf-8, tab-width: 2 -*-

import compileMountOpts from 'compile-linux-mount-options-from-dict-pmb';


const EX = function parseMountUnit(bas) {
  const { mustPop, devPath, mptPath } = bas;
  const descr = mustPop('str', 'descr', '');
  const mountUnit = bas.ini({
    path: bas.mptId,
    pathSuf: '.mount',
  }, {
    Unit: {
      Description: descr,
    },
    Mount: {
      What: devPath,
      Where: mptPath,
      Type: mustPop('nonEmpty str', 'fsType', 'auto'),
      Options: compileMountOpts(mustPop('str | ary | obj', 'fsOpt',
        'defaults,noatime')),
    },
  });

  return mountUnit;
};


export default EX;
