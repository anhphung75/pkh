const ga = {
  cp1: { cv: 0, zcv: 5, },
  cp8: { cv: 0, zcv: 100, },
};

const fn = {
  a2s: (dl) => {
    try {
      if (dl === undefined || dl === null) {
        return '';
      } else if (dl.constructor === String) {
        return dl.toString();
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
    let kq;
    try {
      kq = parseInt(dl);
    } catch (err) { kq = -1; }
    return kq
  },
  isexist: (ma, dl) => {
    if (ma === undefined || ma === null) {
      return true;
    } else if (ma.constructor === String) {
      ma = ma.replace(/\s\s+/g, ' ');
      ma = ma.trim().toLowerCase();
      if (ma.split(' ').join('') === '') { return true; }
    } else if (ma.constructor === Number || ma.constructor === Boolean) {
    } else if (ma.constructor === Array || ma.constructor === Object) {
      ma = JSON.stringify(ma).toLowerCase();
    } else { return false; }
    if (dl === undefined || dl === null) {
      return false;
    } else if (dl.constructor === String) {
      dl = dl.replace(/\s\s+/g, ' ');
      dl = dl.trim().toLowerCase();
      if (dl.split(' ').join('') === '') { return false; }
    } else if (dl.constructor === Number || dl.constructor === Boolean) {
    } else if (dl.constructor === Array || dl.constructor === Object) {
      dl = JSON.stringify(dl).toLowerCase();
    } else { return false; }
    let isok = dl.includes(ma);
    return isok;
  },
  isdict: (ma, dl) => {
    if (dl === undefined || dl === null) {
      return false;
    } else if (dl.constructor === Object) {
    } else { return false; }
    if (ma === undefined || ma === null) {
      return false;
    } else if (ma.constructor === Object) {
      ma = fn.upkey({}, ma);
    } else { return false; }
    //main
    let isok, k, k0, kt, v, v0;
    for (k in ma) {
      isok = false;
      v = ma[k];
      for (k0 in dl) {
        v0 = dl[k0];
        if (k === k0 && v === v0) {
          isok = true;
          break;
        } else {
          v0 = dl[k0] || '';
          if (ma.constructor === Object) {
            kt = fn.isdict(ma, v0);
            if (kt) {
              isok = true;
              break;
            }
          }
        }
      }
      if (isok === false) { return false; }
    }
    return true;
  },
  isval: (ma, dl) => {
    if (dl === undefined || dl === null) {
      return false;
    }
    if (ma === undefined || ma === null) {
      return true;
    } else if (ma.constructor === Array) {
    } else if (ma.constructor === String) {
      ma = ma.replace(/\s\s+/g, ' ');
      ma = ma.trim();
      if (ma.split(' ').join('') === '') { return true; }
      ma = [ma];
    } else if (ma.constructor === Number || ma.constructor === Boolean) {
      ma = [ma];
    } else { return true; }
    //main
    let isok, i, v;
    for (i in ma) {
      v = ma[i];
      isok = fn.isexist(v, dl);
      if (isok === false) { return false; }
    }
    return true;
  },
  gomkey: (rs, dl, ma) => {
    if (rs === undefined || rs === null) {
      return rs;
    } else if (rs.constructor === Object) {
    } else { return rs; }
    if (ma === undefined || ma === null) {
      return rs;
    } else if (ma.constructor === Array) {
    } else if (ma.constructor === String) {
      ma = ma.replace(/\s\s+/g, ' ');
      ma = ma.trim();
      if (ma.split(' ').join('') !== '') { return rs; }
      ma = [ma];
    } else { return rs; }
    let i, k, k0, v;
    for (i in ma) {
      k = ma[i];
      if (!(k in rs)) { rs[k] = []; }
    }
    //main
    for (i in ma) {
      k = ma[i];
      if (dl === undefined || dl === null) {
        return rs;
      } else if (dl.constructor === Object) {
        for (k0 in dl) {
          v = dl[k0];
          if (k === k0) {
            if (fn.isexist(v, rs[k]) === false) {
              rs[k].push(v);
            }
          } else {
            if (v === undefined || v === null) {
            } else if (v.constructor === Object) {
              rs = fn.gomkey(rs, v, ma);
            } else { }
          }
        }
      } else { }
    }
    return rs;
  },
  upkey: (rs, rr) => {
    let k, k1, v1,
      keyxoa = ['notes', 'ghichu', 'old_'];
    if (rr === null || rr === undefined) {
      return rs;
    } else if (rr.constructor === Object) {
      if (!rs || rs.constructor !== Object) { rs = {}; }
      for (k in rr) {
        if (rr[k] === null || rr[k] === undefined) {
        } else if (rr[k].constructor === Object) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = {};
          } else if (rs[k].constructor !== Object) {
            k1 = ["old", k].join("_");
            v1 = rs[k];
            rs[k] = {};
            rs[k][k1] = v1;
          } else { }
          rs[k] = fn.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = fn.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs[k] = rr[k];
        } else if (rr[k].constructor === String) {
          rr[k] = rr[k].replace(/\s\s+/g, ' ');
          rr[k] = rr[k].trim();
          if (rr[k].split(' ').join('') !== '') {
            rs[k] = rr[k];
          } else {
            for (k1 in keyxoa) {
              if (k.includes(keyxoa[k1]) && k in rs) {
                delete rs[k];
                break;
              }
            }
          }
        } else { }
      }
      if (Object.keys(rs).length == 0) { return null; }
    } else if (rr.constructor === Array) {
      if (!rs || rs.constructor !== Array) { rs = []; }
      for (k in rr) {
        if (rr[k] === null || rr[k] === undefined) {
        } else if (rr[k].constructor === Object) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = {};
          } else if (rs[k].constructor !== Object) {
            k1 = ["old", k, rs[k]].join("_");
            v1 = rs[k];
            rs[k] = {};
            rs[k][k1] = v1;
          } else { }
          rs[k] = fn.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = fn.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs.push(rr[k]);
        } else if (rr[k].constructor === String) {
          rr[k] = rr[k].replace(/\s\s+/g, ' ');
          rr[k] = rr[k].trim();
          if (rr[k].split(' ').join('') !== '') {
            rs.push(rr[k]);
          }
        } else { }
      }
      rs = [...new Set(rs)];
      if (rs.length == 0) { return null; }
    } else if (rr.constructor === Number || rr.constructor === Boolean) {
      rs = rr;
    } else if (rr.constructor === String) {
      rr = rr.replace(/\s\s+/g, ' ');
      rr[k] = rr[k].trim();
      if (rr.split(' ').join('') !== '') {
        rs = rr;
      } else {
        return null;
      }
    } else { }
    return rs;
  },
};

var sv = {

};

const idb = {
  csdl: { ten: 'CnTĐ', cap: 1 },
  data1: (bang, luu, gang = 0) => {
    gang = gang === '0' ? 0 : parseInt(gang) || -1;
    if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { self.postMessage({ cv: -1, kq: "not bang to save" }); };
    let uid = luu.idma === '0' ? 0 : parseInt(luu.idma) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "not uid to save" }); }
    let db, cs, rr,
      cv = 1,
      rs = JSON.stringify(luu.data);
    try {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rr = fn.upkey({}, cs.value.data);
              rr = JSON.stringify(rr);
              if (rs === rr) {
                luu.idma = cs.value.idma;
                idb.luu1(bang, luu, 0);
                return;
              }
              cs.continue();
            } else {
              idb.luu1(bang, luu, 0);
              return;
            }
          }
      }
    } catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  luu1: (bang, luu, gang = 0) => {
    gang = gang === '0' ? 0 : parseInt(gang) || -1;
    if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { self.postMessage({ cv: -1, kq: "not bang to save" }); };
    let uid = luu.idma === '0' ? 0 : parseInt(luu.idma) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "not uid to save" }); }
    let db, db1, cs, rs, st, sx,
      cv = 1;
    try {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(IDBKeyRange.only(uid))
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rs = cs.value;
              st = rs.status ? rs.status.toString().toLowerCase() : '';
              if (st.includes('fin') || rs['lastupdate'] > luu['lastupdate']) {
                self.postMessage({ cv: -1, kq: "rec fin or rec to old" });
              } else {
                rs['refs'] = fn.upkey(rs['refs'], luu['refs']);
                rs['data'] = fn.upkey(rs['data'], luu['data']);
                rs['refs'] = fn.upkey({}, luu['refs']);
                rs['data'] = fn.upkey({}, luu['data']);
                rs['status'] = luu['status'];
                rs['lastupdate'] = Date.now();
                sx = cs.update(rs);
                sx.onsuccess = () => {
                  self.postMessage({ cv: cv, luu1: luu['idma'] });
                  self.postMessage({ cv: -1, kq: "save fin" });
                  cv++;
                };
              }
              cs.continue();
            } else {
              ///new data
              luu['refs'] = fn.upkey({}, luu['refs']);
              luu['data'] = fn.upkey({}, luu['data']);
              luu['lastupdate'] = Date.now();
              indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
                db1 = e.target.result
                  .transaction(bang, 'readwrite')
                  .objectStore(bang)
                  .put(luu);
                db1.onsuccess = () => {
                  self.postMessage({ cv: cv, luu1: luu['idma'] });
                  self.postMessage({ cv: -1, kq: "save fin" });
                }
              }
            }
          }
      }
    } catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  xoa1: (bang, xoa, gang = 0) => {
    gang = gang === '0' ? 0 : parseInt(gang) || -1;
    if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { self.postMessage({ cv: -1, kq: "nothing to delete" }); };
    let uid = xoa.idma === '0' ? 0 : parseInt(xoa.idma) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "nothing to delete" }); }
    let db, cs, rs, st;
    cv = 1;
    try {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(IDBKeyRange.only(uid))
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rs = cs.value;
              st = rs.status ? rs.status.toString().toLowerCase() : '';
              if (st.includes('fin')) {
                self.postMessage({ cv: -1, kq: "rec fin" });
              } else {
                cs.delete();
                cv++;
              }
              cs.continue();
            } else {
              self.postMessage({ cv: -1, kq: "delete fin" });
            }
          }
      }
    } catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  nap1: {
    maid: (dk = { prog: 'chiphi', maid: null }, cg3 = 0) => {
      console.log("nv idb.nap1.maid dk=", JSON.stringify(dk, null, 2));
      let bang, maid,
        d8 = { cv: 100 };
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) {
          self.postMessage({ cv: -1, kq: "bất quá tam" });
          return;
        }
        bang = fn.a2sl(dk.prog);
        if (bang.includes('chiphi')) {
          bang = 'chiphi';
        } else if (bang.includes('cpxd')) {
          bang = 'cpxd';
        } else if (bang.includes('cpvt')) {
          bang = 'cpvt';
        } else if (bang.includes('cpvl')) {
          bang = 'cpvl';
        } else if (bang.includes('cptl')) {
          bang = 'cptl';
        } else {
          self.postMessage({ cv: -1, info: "Bảng chưa tồn tại" });
          return;
        }
        maid = fn.a2sl(dk.maid);
        if (maid.length < 1) {
          self.postMessage({ cv: -1, info: "Mã định danh chưa tồn tại" });
          return;
        }

        indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e0) => {
          let db = e0.target.result;
          db.transaction(bang, 'readonly')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(maid))
            .onsuccess = (e1) => {
              cs = e1.target.result;
              if (cs) {
                d8.maid = cs.value;
                cs.continue();
              } else {
                self.postMessage(d8);
                self.postMessage({ cv: -1, info: "fin" });
              }
            }
        }
      } catch (err) {
        cg3 += 1;
        self.postMessage({ cv: -1, err: err });
        setTimeout(() => { idb.nap1.maid(dk, cg3); }, 777);
      }
    },
    idma: (dk = { prog: 'chiphi', idma: 0 }, cg3 = 0) => {
      console.log("nv idb.nap1.maid dk=", JSON.stringify(dk, null, 2));
      let bang, idma,
        d8 = { cv: 100 };
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) {
          self.postMessage({ cv: -1, kq: "bất quá tam" });
          return;
        }
        bang = fn.a2sl(dk.prog);
        if (bang.includes('chiphi')) {
          bang = 'chiphi';
        } else if (bang.includes('cpxd')) {
          bang = 'cpxd';
        } else if (bang.includes('cpvt')) {
          bang = 'cpvt';
        } else if (bang.includes('cpvl')) {
          bang = 'cpvl';
        } else if (bang.includes('cptl')) {
          bang = 'cptl';
        } else {
          self.postMessage({ cv: -1, info: "Bảng chưa tồn tại" });
          return;
        }
        idma = fn.a2i(dk.idma);
        if (idma < 1) {
          self.postMessage({ cv: -1, info: "Mã định danh chưa tồn tại" });
          return;
        }

        indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e0) => {
          let db = e0.target.result;
          db.transaction(bang, 'readonly')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(idma))
            .onsuccess = (e1) => {
              cs = e1.target.result;
              if (cs) {
                d8.idma = cs.value;
                cs.continue();
              } else {
                self.postMessage(d8);
                self.postMessage({ cv: -1, info: "fin" });
              }
            }
        }
      } catch (err) {
        cg3 += 1;
        self.postMessage({ cv: -1, err: err });
        setTimeout(() => { idb.nap1.idma(dk, cg3); }, 777);
      }
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
  },

  gom: {
    key: (bang, gom, gang = 0) => {
      gang = gang === '0' ? 0 : parseInt(gang) || -1;
      if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { self.postMessage({ cv: -1, kq: "bảng chưa tạo" }); };
      let db, tr, i, cs,
        zr = 0,
        cv = 0,
        kq = {};
      if (gom === undefined || gom === null) {
        self.postMessage({ cv: -1, kq: "mã khóa chưa tạo" });
      } else if (gom.constructor === Array) {
      } else if (gom.constructor === String) {
        gom = gom.replace(/\s\s+/g, ' ');
        gom = gom.trim();
        if (gom.split(' ').join('') === '') {
          self.postMessage({ cv: -1, kq: "mã khóa không rõ nghĩa" });
        }
        gom = [gom];
      } else { self.postMessage({ cv: -1, kq: "mã khóa không rõ" }); }
      for (i in gom) { kq[gom[i]] = []; }
      try {
        indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
          db = e.target.result;
          tr = db.transaction(bang, 'readonly')
          tr.objectStore(bang)
            .count()
            .onsuccess = (e) => {
              zr = e.target.result;
              if (zr < 1) { self.postMessage({ cv: -1, kq: "bảng chưa có dữ liệu" }); }
            }

          tr = db.transaction(bang, 'readonly')
          tr.objectStore(bang)
            .openCursor(null, 'prev')
            .onsuccess = (e) => {
              cs = e.target.result;
              if (cs) {
                kq = fn.gomkey(kq, cs.value, gom);
                cv++;
                self.postMessage({ cv: parseInt(cv * 100 / zr), gomkey: kq });
                cs.continue();
              } else {
                self.postMessage({ cv: parseInt(cv * 100 / zr), gomkey: kq });
                self.postMessage({ cv: -1, kq: "fin" });
              }
            }
        }
      } catch (err) { self.postMessage({ cv: cv, err: err }); }
    },
    val: (bang, gom, gang = 0) => {
      gang = gang === '0' ? 0 : parseInt(gang) || -1;
      if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { self.postMessage({ cv: -1, kq: "bảng chưa tạo" }); };
      let db, tr, cs, rec,
        zr = 0,
        cv = 0,
        kq = [];
      if (gom === undefined || gom === null) {
        self.postMessage({ cv: -1, kq: "mã khóa chưa tạo" });
      } else if (gom.constructor === Object || gom.constructor === Array) {
      } else if (gom.constructor === String) {
        gom = gom.replace(/\s\s+/g, ' ');
        gom = gom.trim();
        if (gom.split(' ').join('') === '') {
          self.postMessage({ cv: -1, kq: "mã khóa không rõ nghĩa" });
        }
        gom = [gom];
      } else if (gom.constructor === Number || gom.constructor === Boolean) {
        gom = [gom];
      } else { self.postMessage({ cv: -1, kq: "mã khóa không rõ" }); }
      try {
        indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
          db = e.target.result;
          tr = db.transaction(bang, 'readonly')
          tr.objectStore(bang)
            .count()
            .onsuccess = (e) => {
              zr = e.target.result;
              if (zr < 1) { self.postMessage({ cv: -1, kq: "bảng chưa có dữ liệu" }); }
            }

          tr = db.transaction(bang, 'readonly')
          tr.objectStore(bang)
            .openCursor(null, 'prev')
            .onsuccess = (e) => {
              cs = e.target.result;
              if (cs) {
                rec = cs.value;
                if (gom.constructor === Object && fn.isdict(gom, rec)) {
                  kq.push(rec);
                }
                if (gom.constructor === Array && fn.isval(gom, rec)) {
                  kq.push(rec);
                }
                cv++;
                self.postMessage({ cv: parseInt(cv * 100 / zr), gomval: kq });
                cs.continue();
              } else {
                self.postMessage({ cv: parseInt(cv * 100 / zr), gomval: kq });
                self.postMessage({ cv: -1, kq: "fin" });
              }
            }
        }
      } catch (err) { self.postMessage({ cv: cv, err: err }); }
    },
  },

  nap: {
    nap_old: (bang, nap = null, gang = 0) => {
      gang = gang === '0' ? 0 : parseInt(gang) || -1;
      if (gang > 3) {
        self.postMessage({ cv: -1, kq: "bất quá tam" });
        return;
      }
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else {
        self.postMessage({ cv: -1, kq: "bảng chưa tạo" });
        return;
      };
      let db, tr, rec, r, i, cs, k,
        zr = 0,
        cv = 0,
        kq = [];
      if (nap === undefined || nap === null) {
        self.postMessage({ cv: -1, kq: "không yêu cầu" });
        return;
      } else if (nap.constructor === Object) {
        //tim theo dict dieu kien
      } else if (nap.constructor === Array) {
        //search theo list dieu kien
      } else if (nap.constructor === String || nap.constructor === Number) {
        //search
        nap = nap.toString().toLowerCase();
        nap = nap.split(' ').join(' ');
        if (nap.split(' ').join('') === '') {
          self.postMessage({ cv: -1, kq: "không rõ yêu cầu" });
          return;
        } else {
          nap = [nap];
        }
      } else {
        self.postMessage({ cv: -1, kq: "không rõ yêu cầu" });
        return;
      }
      //try {
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        tr = db.transaction(bang, 'readonly')
        tr.objectStore(bang)
          .count()
          .onsuccess = (e) => { zr = e.target.result; }

        tr = db.transaction(bang, 'readonly')
        tr.objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rec = cs.value;
              if (gom === undefined || gom === null) {
                kq.push(rec);
              } else if (gom.constructor === Array) {
                for (i in gom) {
                  r = cs.value.data;
                  if (gom[i] in r) { kq[gom[i]].add(r[gom[i]]); }
                  r = cs.value.refs;
                  if (gom[i] in r) { kq[gom[i]].add(r[gom[i]]); }
                }
              } else if (gom.constructor === Object) {
                for (k in gom) {
                  r = cs.value.data;
                  if (k in r && r[k] === gom[k]) { kq.push(rec); }
                  r = cs.value.refs;
                  if (k in r && r[k] === gom[k]) { kq.push(rec); }
                }
              } else {
                kq.push(rec);
              }
              cv++;
              self.postMessage({ cv: parseInt(cv * 100 / zr), gom: kq });
              cs.continue();
            } else {
              for (k in kq) { kq[k] = [...kq[k]]; }
              self.postMessage({ cv: parseInt(cv * 100 / zr), gom: kq });
              self.postMessage({ cv: -1, kq: "fin" });
            }
          }
      }
      //} catch (err) { self.postMessage({ cv: cv, err: err }); }
    },
    cpx: (cg3 = 0) => {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) {
        self.postMessage({ cv: -1, kq: "bất quá tam" });
        return;
      }
      let db, cs,
        zr = 0,
        cv = 0,
        kq = {},
        tbl = 'chiphi';
      try {
        indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
          db = e.target.result.transaction(tbl, 'readonly').objectStore(tbl);
          db.count().onsuccess = (e) => {
            zr = e.target.result;
            if (zr < 1) self.postMessage({ "cv": -1, "info": "bảng chưa có dữ liệu" });
          }

          db.openCursor(null, 'prev').onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              kq = cs.value;
              cv++;
              self.postMessage({ "cv": fn.a2i(cv * 100 / zr), "cpx": kq });
              cs.continue();
            } else {
              self.postMessage({ "cv": -1, "info": "fin" });
            }
          }
        }
      } catch (err) {
        cg3 += 1;
        self.postMessage({ "err": err });
        setTimeout(() => idb.nap.cpx(cg3), 222);
      }
    },
  },
};


//main worker
self.onmessage = (ev) => {
  let csdl_ten, csdl_cap,
    tin = ev.data;
  //try {
  csdl_ten = fn.a2s(tin.csdl.ten) || fn.a2s(idb.csdl.ten);
  csdl_cap = fn.a2i(tin.csdl.cap) || fn.a2i(idb.csdl.cap);
  if (csdl_cap < 1) { csdl_cap = 1; }
  idb.csdl = { ten: csdl_ten, cap: csdl_cap };
  self.postMessage({ info: { status: "nhan tu boss idb", db: idb.csdl, tin: tin } });
  if ('idma' in tin) idb.nap1.idma(tin.idma, 0);
  if ('maid' in tin) idb.nap1.maid(tin.maid, 0);
  if ('baogia' in tin) idb.nap1.baogia(tin.baogia, 0);
  if (tin.gom && tin.gom.prog.includes('cpx')) idb.nap.cpx(0);
  //} catch (err) { self.postMessage({ cv: -1, kq: "nothing to do" }); };
}