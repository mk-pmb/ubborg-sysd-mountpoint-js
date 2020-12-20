// -*- coding: utf-8, tab-width: 2 -*-

import compileMountOpts from 'compile-linux-mount-options-from-dict-pmb';
import sysdWants from 'ubborg-sysd-wants';


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

  return {
    mountPointDir: { path: bas.mptPath, mimeType: 'dirOrMounted' },
    mountUnit,
    devDetect: sysdWants(bas.devId + '.device',
      mustPop('bool', 'mountOnDetect', false), mountUnit),
  };
};


export default EX;
