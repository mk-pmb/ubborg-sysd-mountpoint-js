// -*- coding: utf-8, tab-width: 2 -*-

import parseBasics from './parseBasics';
import parseMountUnit from './parseMountUnit';
import parseAutoMountUnit from './parseAutoMountUnit';


// function words(s) { return (s.match(/\S+/g) || []); }


const EX = function parseRichMount(spec) {
  // Rich = with lots of neat extra features.
  const bas = parseBasics(spec);
  const { mustPop } = bas;
  const parts = {
    ...parseMountUnit(bas),
    ...parseAutoMountUnit(bas),
  };

  mustPop.done(`Unsupported options for ${bas.devPath} -> ${bas.mptPath}`);
  return Object.assign(Object.values(parts), { parts });
};


export default EX;
