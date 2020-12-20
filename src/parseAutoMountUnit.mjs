// -*- coding: utf-8, tab-width: 2 -*-

import sysdWants from 'ubborg-sysd-wants';


const fstabAutoTarget = 'local-fs.target';
// man 7 systemd.special says: local-fs.target is the target
// that equates to the "auto" flag in fstab.


const EX = function parseAutoMountUnit(bas) {
  const { mustPop } = bas;
  const amEnabled = mustPop('bool', 'mountOnDemand', false);
  const amUnit = bas.ini({
    path: bas.mptId,
    pathSuf: '.automount',
  }, amEnabled && {
    Unit: {
      Description: '',
    },
    Automount: {
      TimeoutIdleSec: (mustPop('str | num', 'idleSec', '') || 0),
    },
  });

  return {
    autoMountUnit: amUnit,
    autoMountEnable: sysdWants(fstabAutoTarget, amEnabled, amUnit),
  };
};


export default EX;
