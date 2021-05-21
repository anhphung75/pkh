const ga = {
  cp1: { cv: 0, zcv: 5, },
  cp8: { cv: 0, zcv: 100, },
};

const fn = {
  a2s: (dl) => {
    try {
      if (dl === undefined || dl === null) {
        return '';
      } else if (dl.constructor === Error || dl.constructor === RegExp) {
        return '';
      } else if (dl.constructor === String) {
        return dl;
      } else if (dl.constructor === Number) {
        return dl + '';
      } else if (dl.constructor === Date || dl.constructor === Boolean) {
        return String(dl);
      }
      else {
        return JSON.stringify(dl);
      }
    } catch (err) { return ''; }
  },
  a2sl: (dl) => {
    return fn.a2s(dl).toLowerCase();
  },
  a2su: (dl) => {
    return fn.a2s(dl).toUpperCase();
  },
  a2i: (dl) => {
    try {
      return dl ? parseInt(dl) : -1;
    } catch (err) { return -1; }
  },
  sval: (dl) => {
    let k, v,
      s = '';
    if (dl === undefined || dl === null || dl === '') {
      return '';
    } else if (dl.constructor === Object) {
      for (k in dl) { s = s === '' ? fn.sval(dl[k]) : [s, fn.sval(dl[k])].join(' '); }
    } else if (dl.constructor === Array) {
      for (v of ma) { s = s === '' ? fn.sval(dl[k]) : [s, fn.sval(dl[k])].join(' '); }
    } else {
      s = s === '' ? fn.a2s(dl) : [s, fn.a2s(dl)].join(' ');
    }
    return s;
  },
  tim: (ma, dl, isval = true) => {
    if (dl === null || dl === undefined || dl === '') return false;
    console.log("nv-fn.is1val ma=", JSON.stringify(ma, null, 2));
    console.log("nv-fn.is1val dl=", JSON.stringify(dl, null, 2));
    if (isval) dl = fn.sval(dl);
    dl = fn.a2sl(dl);
    if (dl === '') return false;
    let v, k;
    if (ma === null || ma === undefined || ma === '') {
      return true;
    } else if (ma.constructor === Object) {
      for (k in ma) { if (!fn.tim(ma[k], dl)) return false; }
      return true;
    } else if (ma.constructor === Array) {
      for (v of ma) { if (!fn.tim(v, dl)) return false; }
      return true;
    } else {
      ma = fn.a2sl(ma);
    }
    ma = ma.replace(/\s\s+/g, ' ');
    ma = ma.trim();
    if (ma.split(' ').join('') === '') return true;
    return dl.includes(ma) ? true : false;
  },
};

var sv = {

};

const idb = {
  csdl: { ten: 'CnTĐ', cap: 1 },
  gom: (dk = { prog: 'chiphi', bang: 'chiphi', gom: null }, cg3 = 0) => {
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) {
      self.postMessage({ cv: -1, kq: "bất quá tam" });
      return;
    }
    let db, cs, isok, dl,
      cv = 0,
      kq = { "cv": -1 },
      zr = 0,
      tbl = fn.a2sl(dk.tbl || dk.bang) || 'chiphi',
      prog = fn.a2sl(dk.prog),
      ma = dk.gom || dk.otim || dk.ltim || dk.stim,
      gop = dk.gop || false;
    console.log("nv-gom ma=", JSON.stringify(ma, null, 2));

    indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
      db = e.target.result.transaction(tbl, 'readonly').objectStore(tbl);
      db.count().onsuccess = (e) => {
        zr = e.target.result;
        if (zr < 1) self.postMessage({ "cv": -1, "info": "bảng chưa có dữ liệu" });
      }
      db.openCursor(null, 'prev').onsuccess = (e) => {
        cs = e.target.result;
        if (cs) {
          cv++;
          kq = { "cv": fn.a2i(cv * 100 / zr) };
          dl = cs.value;
          if (fn.tim(ma, dl)) kq[prog] = dl;
          self.postMessage(kq);
          cs.continue();
        } else {
          self.postMessage({ "cv": -1, "info": "fin" });
        }
      }
    }

    //} catch (err) {
    //  cg3 += 1;
    //  self.postMessage({ "err": err });
    //  setTimeout(() => idb.nap.cpx(cg3), 222);
    //}
  },
  nap: (dk = { prog: 'cpx', bang: 'chiphi', idma: null }, cg3 = 0) => {
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) {
      self.postMessage({ cv: -1, kq: "bất quá tam" });
      return;
    }
    let db, cs,
      cv = 0,
      kq = { "cv": -1 },
      zr = 0,
      tbl = fn.a2sl(dk.tbl || dk.bang) || 'chiphi',
      prog = fn.a2sl(dk.prog),
      idma = fn.a2i(dk.idma) || -1;
    console.log("nv-nap.cpx idma=", JSON.stringify(idma, null, 2));
    if (idma > 0) {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result.transaction(tbl, 'readonly').objectStore(tbl);
        db.openCursor(IDBKeyRange.only(idma)).onsuccess = (e) => {
          cs = e.target.result;
          if (cs) {
            cv++;
            kq.cv = fn.a2i(cv * 100);
            kq[prog] = cs.value;
            self.postMessage(kq);
            cs.continue();
          } else {
            self.postMessage({ "cv": -1, "info": "fin" });
          }
        }
      }
    } else {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result.transaction(tbl, 'readonly').objectStore(tbl);
        db.count().onsuccess = (e) => {
          zr = e.target.result;
          if (zr < 1) self.postMessage({ "cv": -1, "info": "bảng chưa có dữ liệu" });
        }
        db.openCursor(null, 'prev').onsuccess = (e) => {
          cs = e.target.result;
          if (cs) {
            cv++;
            kq.cv = fn.a2i(cv * 100 / zr);
            kq[prog] = cs.value;
            self.postMessage(kq);
            cs.continue();
          } else {
            self.postMessage({ "cv": -1, "info": "fin" });
          }
        }
      }
    }
    //} catch (err) {
    //  cg3 += 1;
    //  self.postMessage({ "err": err });
    //  setTimeout(() => idb.nap.cpx(cg3), 222);
    //}
  },
  baogia: (dk = { plbg: 'bgvl', prog: 'bgvl', chiphi: 0, baogia: null, plgia: 'dutoan' }, cg3 = 0) => {
    console.log("nv idb.nap1.maid dk=", JSON.stringify(dk, null, 2));
    let bang, chiphi, baogia, plgia, db, tr, ztt,
      tt = 0,
      d8 = { cv: 100, baogia: 0, gia: 0 };
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) {
        self.postMessage({ cv: -1, kq: "Bất quá tam" });
        return;
      }
      bang = fn.a2sl(dk.prog);
      if (bang.includes('nc')) {
        bang = 'bgnc';
      } else if (bang.includes('mtc')) {
        bang = 'bgmtc';
      } else if (bang.includes('tl')) {
        bang = 'bgtl';
      } else { bang = 'bgvl'; }
      dk.chiphi = fn.a2i(dk.chiphi);
      if (dk.chiphi < 0) {
        self.postMessage({ cv: -1, info: "Mã định danh chưa tồn tại" });
        return;
      }
      dk.baogia = fn.a2i(dk.baogia);
      if (dk.baogia < 0) {
        self.postMessage({ cv: -1, info: "Báo giá chưa tồn tại" });
        return;
      }
      plgia = fn.a2sl(dk.plgia);
      if (plgia.length < 1) {
        self.postMessage({ cv: -1, info: "Phân loại giá chưa tồn tại" });
        return;
      }
      //main
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e0) => {
        db = e0.target.result;
        tr = db.transaction(bang, 'readonly')
        tr.objectStore(bang)
          .count()
          .onsuccess = (e1) => { ztt = e1.target.result; }

        tr = db.transaction(bang, 'readonly')
        tr.objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e2) => {
            cs = e2.target.result;
            if (cs) {
              r = cs.value.data;
              chiphi = fn.a2i(r.chiphi);
              baogia = fn.a2i(r.baogia || r.mabaogia);
              gia = plgia in r ? Math.abs(r[plgia]) : 0;
              if (chiphi === dk.chiphi && baogia > d8.baogia && baogia <= dk.baogia) {
                if (d8.baogia < baogia) {
                  d8.baogia = baogia;
                  d8.gia = gia;
                }
              }
              tt++;
              d8.cv = fn.a2i(100 * tt / ztt);
              cs.continue();
            } else {
              console.log("swidb.nap1.baogia last d8=", JSON.stringify(d8, null, 2));
              if (bang.includes('nc')) {
                d8.gianc = d8.gia;
              } else if (bang.includes('mtc')) {
                d8.giamtc = d8.gia;
              } else if (bang.includes('tl')) {
                d8.giatl = d8.gia;
              } else {
                d8.giavl = d8.gia;
              }
              self.postMessage(d8);
              self.postMessage({ cv: -1, info: "fin" });
            }
          }
      }
    } catch (err) {
      cg3 += 1;
      self.postMessage({ cv: -1, err: err });
      setTimeout(() => { idb.nap1(dk, cg3); }, 777);
    }
  },
};


// MAIN WORKER
self.onmessage = (ev) => {
  let csdl_ten, csdl_cap, dl,
    tin = ev.data;
  //try {
  csdl_ten = fn.a2s(tin.csdl.ten) || fn.a2s(idb.csdl.ten);
  csdl_cap = fn.a2i(tin.csdl.cap) || fn.a2i(idb.csdl.cap);
  if (csdl_cap < 1) { csdl_cap = 1; }
  idb.csdl = { ten: csdl_ten, cap: csdl_cap };
  self.postMessage({ "info": { "status": "nhan tu boss idb", "db": idb.csdl, "tin": tin } });
  if ('idma' in tin) idb.nap1.idma(tin.idma, 0);
  if ('maid' in tin) idb.nap1.maid(tin.maid, 0);
  if ('baogia' in tin) idb.nap1.baogia(tin.baogia, 0);
  if (tin.nap) {
    dl = tin.nap;
    if (dl.prog.includes('cpx')) dl.bang = 'chiphi';
    if (dl.prog.includes('chiphi')) dl.bang = 'chiphi';
    idb.nap(dl, 0);
  }
  if (tin.gom) {
    dl = tin.gom;
    if (dl.prog.includes('cpx')) dl.bang = 'chiphi';
    if (dl.prog.includes('chiphi')) dl.bang = 'chiphi';
    idb.gom(dl, 0);
  }
  //} catch (err) { self.postMessage({ cv: -1, kq: "nothing to do" }); };
}