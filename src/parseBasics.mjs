// -*- coding: utf-8, tab-width: 2 -*-

import pathLib from 'path';

import is from 'typechecks-pmb';
import mustBe from 'typechecks-pmb/must-be';
import objPop from 'objpop';
import sysdEsc from 'systemd-escape-pmb';

import devDiskBy from './devDiskBy';

function normalizeMountpointSpec(s) {
  mustBe('obj | nonEmpty str', 'device/mountpoint spec', s);
  if (is.str(s)) { return { device: s }; }
  return s;
}


const EX = function parseBasics(spec) {
  const mustPop = objPop(normalizeMountpointSpec(spec), { mustBe }).mustBe;
  const sysdLibDir = mustPop('str', 'sysdLibDir', '/lib') + '/systemd/system/';

  const devPath = devDiskBy(mustPop('nonEmpty str', 'device'));
  const devId = sysdEsc.escapePath(devPath);

  const mptPath = mustPop('nonEmpty str', 'mountAt',
    '/mnt/' + pathLib.basename(devPath));
  const mptId = sysdEsc.escapePath(mptPath);

  const bas = {
    mustPop,
    sysdLibDir,
    devPath,
    devId,
    mptPath,
    mptId,

    ini(meta, content) {
      return {
        pathPre: sysdLibDir,
        path: undefined,
        pathSuf: undefined,
        ...meta,
        mimeType: (content ? 'static_ini' : null),
        ...(content && { content }),
      };
    },

  };
  return bas;
};

export default EX;
