// -*- coding: utf-8, tab-width: 2 -*-

import tu from '../testUtil';
import exBackup from './exBackup';
import exDeadBeef from './exDeadBeef';
import exRocket from './exRocket';
import exVideo from './exVideo';


tu.cmp(exBackup);
tu.cmp(exVideo);
tu.cmp(exDeadBeef);
tu.cmp(exRocket);

tu.cmp({
  name: 'basics: input array test',
  input: [
    exBackup.input,
    exDeadBeef.input,
    exRocket.input,
  ],
  wantsList: [
    ...exBackup.wantsList,
    ...exDeadBeef.wantsList,
    ...exRocket.wantsList,
  ],
});




console.info('+OK basics test passed.');
