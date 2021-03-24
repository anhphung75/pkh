const ga = {
  cp1: { cv: 0, zcv: 5, },
  cp8: { cv: 0, zcv: 100, },
};

const fn = {
  a2s: (dl) => {
    if (dl === undefined || dl === null) {
      return '';
    } else if (dl.constructor === String) {
      return dl.toString();
    }
    else {
      return JSON.stringify(dl);
    }
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

const db = {
  csdl: { ten: 'cntd', cap: 1 },
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
      indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
                db.luu1(bang, luu, 0);
                return;
              }
              cs.continue();
            } else {
              db.luu1(bang, luu, 0);
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
      indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
              indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
      indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
    idma: (bang, dk = { idma: 0 }, gang = 0) => {
      gang = a2i(gang);
      if (gang > 3) {
        self.postMessage({ cv: -1, kq: "bất quá tam" });
        return;
      }
      bang = a2sl(bang);
      if (bang.length < 1) {
        self.postMessage({ cv: -1, info: "Bảng chưa tồn tại" });
        return;
      };
      let idma;
      try {
        idma = a2i(dk.idma);
        if (idma < 0) {
          self.postMessage({ cv: 100, idma: 0 });
          self.postMessage({ cv: -1, info: "Mã định danh chưa tồn tại" });
          return;
        }
      } catch (err) { self.postMessage({ cv: -1, err: err }); }
      try {
        indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e0) => {
          let db = e0.target.result;
          db.transaction(bang, 'readonly')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(idma))
            .onsuccess = (e1) => {
              cs = e1.target.result;
              if (cs) {
                self.postMessage({ cv: 100, idma: cs.value });
                cs.continue();
              } else {
                self.postMessage({ cv: -1, info: "fin" });
              }
            }
        }
      } catch (err) { self.postMessage({ cv: -1, err: err }); }
    },
    baogia_old: (bang, dl = { chiphi: 0, baogia: 0, plgia: 'dutoan' }, gang = 0) => {
      gang = a2i(gang);
      if (gang > 3) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, kq: "bất quá tam" });
        return;
      }
      bang = a2sl(bang);
      if (!(['bgvl', 'bgnc', 'bgmtc', 'bgtl'].includes(bang))) { bang = 'bgvl'; }
      if (!dl.cv || dl.cv.constructor !== Object) {
        dl.cv = { cp: 0, vl: 0, nc: 0, mtc: 0, tl: 0 };
      } else {
        if (bang.includes('bgvl') && dl.cv.vl === 100) { return; }
        if (bang.includes('bgnc') && dl.cv.nc === 100) { return; }
        if (bang.includes('bgmtc') && dl.cv.mtc === 100) { return; }
        if (bang.includes('bgtl') && dl.cv.tl === 100) { return; }
      }
      let db, r, cs, k1, chiphi, baogia, plgia, gia, _chiphi, _baogia,
        k = 0,
        kq = { "0": 0 };
      //try {
      chiphi = a2i(dl.chiphi);
      if (chiphi < 0) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, info: "Chi phí không tồn tại, trả giá mặc định" });
        return;
      }
      baogia = a2i(dl.baogia);
      if (baogia < 0) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, info: "Báo giá không tồn tại, trả giá mặc định" });
        return;
      }
      plgia = dl.plgia ? a2sl(dl.plgia) : 'dutoan';

      //} catch (err) { self.postMessage({ cv: -1, err: err }); }
      //try {
      indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              r = cs.value.data;
              _chiphi = a2i(r.chiphi);
              _baogia = a2i(r.baogia || r.mabaogia);
              gia = r[plgia] ? Math.abs(r[plgia]) : 0;
              if (_chiphi == chiphi) {
                if (_baogia == baogia) {
                  if (bang.includes('bgvl')) {
                    dl.giavl = gia;
                    dl.cv.vl = 100;
                  }
                  if (bang.includes('bgnc')) {
                    dl.gianc = gia;
                    dl.cv.nc = 100;
                  }
                  if (bang.includes('bgmtc')) {
                    dl.giamtc = gia;
                    dl.cv.mtc = 100;
                  }
                  if (bang.includes('bgtl')) {
                    dl.giatl = gia;
                    dl.cv.tl = 100;
                  }
                  tiendo.chiphi(dl);
                  db.nap1.chiphi('chiphi', dl, gang);
                  return;
                }
                if (_baogia >= 0 && _baogia <= baogia && _baogia > k) {
                  k = _baogia;
                  if (!(k in kq)) {
                    kq[k] = gia;
                    for (k1 in kq) {
                      if (k1 < k) { delete kq[k1]; }
                    }
                  }
                }
              }
              cs.continue();
            } else {
              console.log("swidb.nap1.baogia last kq=", JSON.stringify(kq, null, 2));
              baogia = 0;
              for (k in kq) {
                if (baogia < k) { baogia = k; }
              }
              gia = kq[baogia];
              if (bang.includes('bgvl')) {
                dl.giavl = gia;
                dl.cv.vl = 100;
              }
              if (bang.includes('bgnc')) {
                dl.gianc = gia;
                dl.cv.nc = 100;
              }
              if (bang.includes('bgmtc')) {
                dl.giamtc = gia;
                dl.cv.mtc = 100;
              }
              if (bang.includes('bgtl')) {
                dl.giatl = gia;
                dl.cv.tl = 100;
              }
              tiendo.chiphi(dl);
              db.nap1.chiphi('chiphi', dl, gang);
            }
          }
      }
      //} catch (err) { self.postMessage({ err: err }); }
    },
    chiphi_old: (bang = 'chiphi', zd1 = { idma: 0 }, gang = 0) => {
      try {
        gang = fn.a2i(gang);
        if (gang > 3) {
          self.postMessage({ cv: 100, chiphi: zd1 });
          self.postMessage({ cv: -1, info: "bất quá tam" });
          return;
        }
      } catch (err) { return; }

      let db, r,
        idma = a2i(zd1.chiphi);
      if (idma < 0) {
        self.postMessage({ cv: 100, chiphi: zd1 });
        self.postMessage({ cv: -1, info: "Mã định danh chưa tồn tại" });
        return;
      }
      if ('giavl' in zd1 && 'gianc' in zd1 && 'giamtc' in zd1 && 'giatl' in zd1) {
        return;
      }

      try {
        indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e0) => {
          db = e0.target.result;
          db.transaction(bang, 'readonly')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(idma))
            .onsuccess = (e1) => {
              cs = e1.target.result;
              if (cs) {
                r = cs.value.data;
                zd1.barcode = r.barcode || r.idma;
                zd1.qrcode = r.qrcode || r.idma;
                zd1.mota = r.mota;
                zd1.dvt = r.dvt;
                if (!('giavl' in zd1)) {
                  db.nap1.baogia('bgvl', zd1, 0);
                } else if (!('gianc' in zd1)) {
                  db.nap1.baogia('bgnc', zd1, 0);
                } else if (!('giamtc' in zd1)) {
                  db.nap1.baogia('bgmtc', zd1, 0);
                } else {
                  db.nap1.baogia('bgtl', zd1, 0);
                }
                cs.continue();
              } else {
                self.postMessage({ cv: 100, chiphi: zd1 });
                self.postMessage({ cv: -1, info: "Fin" });
              }
            }
        }
      } catch (err) {
        self.postMessage({ err: err });
        gang += 1;
        setTimeout(() => { db.nap1.chiphi(bang, zd1, gang); }, 1000);
      }
    },
    baogia: (dk1 = { bang: 'bgvl', idma: 0, chiphi: 0 }, cg3 = 0) => {
      gang = a2i(gang);
      if (gang > 3) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, kq: "bất quá tam" });
        return;
      }
      bang = a2sl(bang);
      if (!(['bgvl', 'bgnc', 'bgmtc', 'bgtl'].includes(bang))) { bang = 'bgvl'; }
      if (!dl.cv || dl.cv.constructor !== Object) {
        dl.cv = { cp: 0, vl: 0, nc: 0, mtc: 0, tl: 0 };
      } else {
        if (bang.includes('bgvl') && dl.cv.vl === 100) { return; }
        if (bang.includes('bgnc') && dl.cv.nc === 100) { return; }
        if (bang.includes('bgmtc') && dl.cv.mtc === 100) { return; }
        if (bang.includes('bgtl') && dl.cv.tl === 100) { return; }
      }
      let db, r, cs, k1, chiphi, baogia, plgia, gia, _chiphi, _baogia,
        k = 0,
        kq = { "0": 0 };
      //try {
      chiphi = a2i(dl.chiphi);
      if (chiphi < 0) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, info: "Chi phí không tồn tại, trả giá mặc định" });
        return;
      }
      baogia = a2i(dl.baogia);
      if (baogia < 0) {
        self.postMessage({ cv: 100, chiphi: dl });
        self.postMessage({ cv: -1, info: "Báo giá không tồn tại, trả giá mặc định" });
        return;
      }
      plgia = dl.plgia ? a2sl(dl.plgia) : 'dutoan';

      //} catch (err) { self.postMessage({ cv: -1, err: err }); }
      //try {
      indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              r = cs.value.data;
              _chiphi = a2i(r.chiphi);
              _baogia = a2i(r.baogia || r.mabaogia);
              gia = r[plgia] ? Math.abs(r[plgia]) : 0;
              if (_chiphi == chiphi) {
                if (_baogia == baogia) {
                  if (bang.includes('bgvl')) {
                    dl.giavl = gia;
                    dl.cv.vl = 100;
                  }
                  if (bang.includes('bgnc')) {
                    dl.gianc = gia;
                    dl.cv.nc = 100;
                  }
                  if (bang.includes('bgmtc')) {
                    dl.giamtc = gia;
                    dl.cv.mtc = 100;
                  }
                  if (bang.includes('bgtl')) {
                    dl.giatl = gia;
                    dl.cv.tl = 100;
                  }
                  tiendo.chiphi(dl);
                  db.nap1.chiphi('chiphi', dl, gang);
                  return;
                }
                if (_baogia >= 0 && _baogia <= baogia && _baogia > k) {
                  k = _baogia;
                  if (!(k in kq)) {
                    kq[k] = gia;
                    for (k1 in kq) {
                      if (k1 < k) { delete kq[k1]; }
                    }
                  }
                }
              }
              cs.continue();
            } else {
              console.log("swidb.nap1.baogia last kq=", JSON.stringify(kq, null, 2));
              baogia = 0;
              for (k in kq) {
                if (baogia < k) { baogia = k; }
              }
              gia = kq[baogia];
              if (bang.includes('bgvl')) {
                dl.giavl = gia;
                dl.cv.vl = 100;
              }
              if (bang.includes('bgnc')) {
                dl.gianc = gia;
                dl.cv.nc = 100;
              }
              if (bang.includes('bgmtc')) {
                dl.giamtc = gia;
                dl.cv.mtc = 100;
              }
              if (bang.includes('bgtl')) {
                dl.giatl = gia;
                dl.cv.tl = 100;
              }
              tiendo.chiphi(dl);
              db.nap1.chiphi('chiphi', dl, gang);
            }
          }
      }
      //} catch (err) { self.postMessage({ err: err }); }
    },
    chiphi: (dk1 = { idma: 0, chiphi: 0 }, cg3 = 0) => {
      let db, cv, idma, r, k,
        bang = 'chiphi',
        kq1 = ga.cp1;

      try {
        cv = fn.a2i(kq1.cv);
        if (cv >= 0 && cv <= 100) {
          self.postMessage({ sv: 'chiphi', cv: cv });
        } else if (cv === 100) {
          self.postMessage({ sv: 'chiphi', cv: cv, chiphi: kq1 });
          self.postMessage({ sv: 'chiphi', cv: -1, info: "Chi phí nạp xong" });
          return;
        } else {
          kq1.cv = 0;
          self.postMessage({ sv: 'chiphi', cv: 0 });
        }
        idma = fn.a2i(dk1.chiphi || dk1.idma);
        if (idma < 0) {
          self.postMessage({ sv: 'chiphi', cv: 100, chiphi: kq1 });
          self.postMessage({ sv: 'chiphi', cv: -1, info: "Mã định danh chưa tồn tại" });
          return;
        }
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) {
          self.postMessage({ sv: 'chiphi', cv: 100, chiphi: kq1 });
          self.postMessage({ sv: 'chiphi', cv: -1, info: "bất quá tam" });
          return;
        }
        if (cg3 === 0) {
          //set defa
          kq1.cv = 0;
          kq1.zcv = 5;
          kq1.chiphi = idma;
          kq1.baogia = fn.a2i(dk1.baogia || dk1.mabaogia);
          kq1.plgia = fn.a2sl(dk1.plgia || 'dutoan');
          kq1.giavl = 0;
          kq1.gianc = 0;
          kq1.giamtc = 0;
          kq1.giatl = 0;
        }
      } catch (err) { return; }

      try {
        indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e0) => {
          db = e0.target.result;
          db.transaction(bang, 'readonly')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(idma))
            .onsuccess = (e1) => {
              cs = e1.target.result;
              if (cs) {
                r = cs.value.data;
                kq1.barcode = r.barcode || r.idma;
                kq1.qrcode = r.qrcode || r.idma;
                kq1.mota = r.mota;
                kq1.dvt = r.dvt;
                kq1.cv = fn.a2i(100 / kq1.zcv);
                if (!('giavl' in kq1)) {
                  db.nap1.baogia('bgvl', kq1, 0);
                } else if (!('gianc' in kq1)) {
                  db.nap1.baogia('bgnc', kq1, 0);
                } else if (!('giamtc' in kq1)) {
                  db.nap1.baogia('bgmtc', kq1, 0);
                } else {
                  db.nap1.baogia('bgtl', kq1, 0);
                }
                cs.continue();
              } else {
                for (k in ['giavl', 'gianc', 'giamtc', 'giatl']) {
                  if (k in kq1) { kq1.cv += fn.a2i(100 / kq1.zcv); }
                }
                setTimeout(() => { db.nap1.chiphi(dk1, 1); }, 77);
              }
            }
        }
      } catch (err) {
        self.postMessage({ sv: 'chiphi', err: err });
        cg3 += 1;
        setTimeout(() => { db.nap1.chiphi(dk1, cg3); }, 777);
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
        indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
        indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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

  nap: (bang, nap = null, gang = 0) => {
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
    indexedDB.open(db.csdl.ten, db.csdl.cap).onsuccess = (e) => {
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
};


//main worker
self.onmessage = (ev) => {
  self.postMessage({ cv: 0, kq: "db active" });
  //try {
  let tin = ev.data,
    csdl_ten = tin.csdl.ten.toString().toLowerCase(),
    csdl_cap = tin.csdl.cap.constructor !== Number ? 1 : parseInt(tin.csdl.cap),
    bang = tin.bang.toString().toLowerCase();

  db.csdl = { ten: csdl_ten, cap: csdl_cap };
  self.postMessage({ cv: 0, info: "nhan tu boss idb", tin: tin });
  if ('baogia' in tin) {
    db.nap1.baogia(bang, tin.baogia, tin.gang);
  }
  if ('gom.key' in tin) { db.gom.key(bang, tin['gom.key'], tin.gang); }
  if ('gom.val' in tin) { db.gom.val(bang, tin['gom.val'], tin.gang); }
  if ('gomkey' in tin) { db.gom.key(bang, tin['gomkey'], tin.gang); }
  if ('gomval' in tin) { db.gom.val(bang, tin['gomval'], tin.gang); }
  if ('nap1' in tin) { }
  if ('luu1' in tin || 'data1' in tin) { db.data1(bang, tin.luu1, tin.gang); }
  if ('idma' in tin) { db.nap1.idma(bang, { idma: tin.idma }, tin.gang) }
  //} catch (err) {    self.postMessage({ cv: -1, kq: "nothing to do" });  };
}