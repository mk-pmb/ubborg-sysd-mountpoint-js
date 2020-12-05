// -*- coding: utf-8, tab-width: 2 -*-


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
  return amu;
};


export default EX;
