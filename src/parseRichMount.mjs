// -*- coding: utf-8, tab-width: 2 -*-

import parseBasics from './parseBasics';
import parseMountUnit from './parseMountUnit';
import parseAutoMountUnit from './parseAutoMountUnit';
import sysdWants from './sysdWants';


// function words(s) { return (s.match(/\S+/g) || []); }


const EX = function parseRichMount(spec) {
  // Rich = with lots of neat extra features.
  const bas = parseBasics(spec);
  const { mustPop } = bas;
  const mountUnit = parseMountUnit(bas);
  const autoMountUnit = parseAutoMountUnit(bas);
  const devDetect = sysdWants(bas.devId + '.device',
    mustPop('bool', 'mountOnDetect', false), mountUnit);

  mustPop.done(`Unsupported options for ${bas.devPath} -> ${bas.mptPath}`);

  return [
    bas.mptPath + '/',
    mountUnit,
    devDetect,
    autoMountUnit,
  ];
};


export default EX;
