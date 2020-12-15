// -*- coding: utf-8, tab-width: 2 -*-

import sysdWants from './sysdWants';


const fstabAutoTarget = 'local-fs.target';
// man 7 systemd.special says: local-fs.target is the target
// that equates to the "auto" flag in fstab.


const EX = function parseAutoMountUnit(bas) {
  const { mustPop } = bas;
  const amu = bas.ini({
    path: bas.mptId,
    pathSuf: '.automount',
  }, mustPop('bool', 'mountOnDemand', false) && {
    Unit: {
      Description: '',
    },
    Automount: {
      TimeoutIdleSec: (mustPop('str | num', 'idleSec', '') || 0),
    },
  });

  return {
    autoMountUnit: amu,
    autoMountEnable: sysdWants(fstabAutoTarget,
      mustPop('bool', 'mountOnDemand', false), amu),
  };
};


export default EX;
