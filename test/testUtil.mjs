// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'clarify';

import getOwn from 'getown';
import equal from 'equal-pmb';

import mnpt from '..';


const tu = {

  lss: '/lib/systemd/system/',
  ess: '/etc/systemd/system/',

};


function objKeysSafeSorted(x) { return x && Object.keys(x).sort(); }


Object.assign(tu, {
  mtUnit: { pathPre: tu.lss, mimeType: 'static_ini' },
  mtSym: { pathPre: tu.ess, mimeType: 'sym' },
  mtDel: { mimeType: null },

  unitDefaults: {
    Unit: { Description: '' },
  },

  traceTest(err) {
    let tr = err.stack.split(/\n/);
    tr = tr.map((ln) => {
      if (!/^\s+at\s/.test(ln)) { return; }
      const sub = (ln.split(/\/test\//).slice(1).slice(-1)[0]
        || '').replace(/\)$/, '').replace(/\.mjs$/, '');
      if (!sub) { return; }
      if (sub.startsWith('testUtil.mjs')) { return; }
      return sub;
    }).filter(Boolean);
    return tr;
  },

  cmp(how) {
    const specs = mnpt(how.input);
    const wants = how.wantsList;
    const detailIdx = (how.idx || 0);
    const ds = getOwn(specs, detailIdx);
    const dw = getOwn(wants, detailIdx);
    try {
      equal.named('cmp:detail[' + detailIdx + ']', function details() {
        equal.named(':keys',
          () => equal.lists(objKeysSafeSorted(ds), objKeysSafeSorted(dw)));
        equal.named('.content',
          () => equal(getOwn(ds, 'content'), getOwn(dw, 'content')));
        equal(ds, dw);
      });
      equal.lists(specs, wants);
    } catch (err) {
      let tr = tu.traceTest(err);
      if (tr) {
        tr = err.message + '\n    @' + [(how.name || '?'), ...tr].join(' @');
        tr = Object.assign(new Error(tr), err, { message: tr });
        throw tr;
      }
      throw err;
    }
  },

  simpleTestSpec(trace, input, wantsDict, ovr) {
    const t = {
      name: (/\/(\w+)\.mjs$/.exec(trace.url) || false)[1],
      input,
      ...wantsDict,
      wantsList: Object.values(wantsDict),
      wantsDict,
      ...ovr,
    };
    return t;
  },

});

export default tu;
