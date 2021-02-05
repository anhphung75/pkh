var sw = {
  csdl: { ten: 'cntd', cap: 1 },
  ham: {
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
        ma = sw.ham.upkey({}, ma);
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
              kt = sw.ham.isdict(ma, v0);
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
        isok = sw.ham.isexist(v, dl);
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
              if (sw.ham.isexist(v, rs[k]) === false) {
                rs[k].push(v);
              }
            } else {
              if (v === undefined || v === null) {
              } else if (v.constructor === Object) {
                rs = sw.ham.gomkey(rs, v, ma);
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
            rs[k] = sw.ham.upkey(rs[k], rr[k]);
          } else if (rr[k].constructor === Array) {
            if (rs[k] === null || rs[k] === undefined) {
              rs[k] = [];
            } else if (rs[k].constructor !== Array) {
              rs[k] = [rs[k]];
            } else { }
            rs[k] = sw.ham.upkey(rs[k], rr[k]);
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
            rs[k] = sw.ham.upkey(rs[k], rr[k]);
          } else if (rr[k].constructor === Array) {
            if (rs[k] === null || rs[k] === undefined) {
              rs[k] = [];
            } else if (rs[k].constructor !== Array) {
              rs[k] = [rs[k]];
            } else { }
            rs[k] = sw.ham.upkey(rs[k], rr[k]);
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
  },
  data1: (bang, luu, gang = 0) => {
    gang = gang === '0' ? 0 : parseInt(gang) || -1;
    if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { self.postMessage({ cv: -1, kq: "not bang to save" }); };
    let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "not uid to save" }); }
    let db, cs, rr,
      cv = 1,
      rs = JSON.stringify(luu.data);
    try {
      indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rr = sw.ham.upkey({}, cs.value.data);
              rr = JSON.stringify(rr);
              if (rs === rr) {
                luu.idutc = cs.value.idutc;
                sw.luu1(bang, luu, 0);
                return;
              }
              cs.continue();
            } else {
              sw.luu1(bang, luu, 0);
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
    let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "not uid to save" }); }
    let db, db1, cs, rs, st, sx,
      cv = 1;
    try {
      indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
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
                rs['refs'] = sw.ham.upkey(rs['refs'], luu['refs']);
                rs['data'] = sw.ham.upkey(rs['data'], luu['data']);
                rs['refs'] = sw.ham.upkey({}, luu['refs']);
                rs['data'] = sw.ham.upkey({}, luu['data']);
                rs['status'] = luu['status'];
                rs['lastupdate'] = Date.now();
                sx = cs.update(rs);
                sx.onsuccess = () => {
                  self.postMessage({ cv: cv, luu1: luu['idutc'] });
                  self.postMessage({ cv: -1, kq: "save fin" });
                  cv++;
                };
              }
              cs.continue();
            } else {
              ///new data
              luu['refs'] = sw.ham.upkey({}, luu['refs']);
              luu['data'] = sw.ham.upkey({}, luu['data']);
              luu['lastupdate'] = Date.now();
              indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
                db1 = e.target.result
                  .transaction(bang, 'readwrite')
                  .objectStore(bang)
                  .put(luu);
                db1.onsuccess = () => {
                  self.postMessage({ cv: cv, luu1: luu['idutc'] });
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
    let uid = xoa.idutc === '0' ? 0 : parseInt(xoa.idutc) || -1;
    if (uid < 0) { self.postMessage({ cv: -1, kq: "nothing to delete" }); }
    let db, cs, rs, st;
    cv = 1;
    try {
      indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
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
    baogia: (bang, chiphi, baogia, plgia = 'dutoan', gang = 0) => {
      gang = gang === '0' ? 0 : parseInt(gang) || -1;
      if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else {
        self.postMessage({ cv: 1, baogia: 0 });
        self.postMessage({ cv: -1, kq: "Bảng không tồn tại, trả giá mặc định" });
        return;
      };
      chiphi = chiphi === '0' ? 0 : parseInt(chiphi) || -1;
      if (chiphi < 0) {
        self.postMessage({ cv: 1, baogia: 0 });
        self.postMessage({ cv: -1, kq: "Chi phí không tồn tại, trả giá mặc định" });
        return;
      }
      baogia = baogia === '0' ? 0 : parseInt(baogia) || -1;
      if (baogia < 0) {
        self.postMessage({ cv: 1, baogia: 0 });
        self.postMessage({ cv: -1, kq: "Báo giá không tồn tại, trả giá mặc định" });
        return;
      }
      if (plgia) {
        plgia = plgia.toString().toLowerCase();
      } else { plgia = 'dutoan'; };
      let db, r, v, dk, cs, k1,
        k = 0,
        kq = {};
      try {
        indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
          db = e.target.result;
          db.transaction(bang, 'readwrite')
            .objectStore(bang)
            .openCursor(null, 'prev')
            .onsuccess = (e) => {
              cs = e.target.result;
              dk = 0;
              if (cs) {
                r = cs.value;
                dk = parseInt(r.data.mabaogia);
                if (r.data.chiphi === chiphi && plgia in r.data && dk <= baogia && dk > k) {
                  k = dk;
                  v = Math.abs(r.data[plgia]);
                  if (!(k in kq)) {
                    kq[k] = v;
                    for (k1 in kq) {
                      if (k1 < k) { delete kq[k1]; }
                    }
                  }
                }
                cs.continue();
              } else {
                for (k in kq) {
                  break;
                }
                kq = kq[k] ? kq[k] : 0;
                self.postMessage({ cv: cv, baogia: kq });
                self.postMessage({ cv: -1, kq: "fin" });
              }
            }
        }
      } catch (err) { self.postMessage({ cv: cv, err: err }); }
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
        indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
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
                kq = sw.ham.gomkey(kq, cs.value, gom);
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
        indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
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
                if (gom.constructor === Object && sw.ham.isdict(gom, rec)) {
                  kq.push(rec);
                }
                if (gom.constructor === Array && sw.ham.isval(gom, rec)) {
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
    indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
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
  self.postMessage({ cv: 0, kq: "sw active" });
  //try {
  let tin = ev.data,
    csdl_ten = tin.csdl.ten.toString().toLowerCase(),
    csdl_cap = tin.csdl.cap === '0' ? 0 : parseInt(tin.csdl.cap) || 0,
    bang = tin.bang.toString().toLowerCase();

  sw.csdl = { ten: csdl_ten, cap: csdl_cap };
  self.postMessage({ cv: 0, info: "nhan tu boss idb", tin: tin });
  if ('baogia' in tin) {
    sw.nap1.baogia(bang, tin.baogia.chiphi, tin.baogia.baogia, tin.baogia.plgia);
  }
  if ('gom.key' in tin) { sw.gom.key(bang, tin['gom.key'], tin.gang); }
  if ('gom.val' in tin) { sw.gom.val(bang, tin['gom.val'], tin.gang); }
  if ('gomkey' in tin) { sw.gom.key(bang, tin['gomkey'], tin.gang); }
  if ('gomval' in tin) { sw.gom.val(bang, tin['gomval'], tin.gang); }
  if ('nap1' in tin) { }
  if ('luu1' in tin || 'data1' in tin) { sw.data1(bang, tin.luu1, tin.gang); }
  //} catch (err) {    self.postMessage({ cv: -1, kq: "nothing to do" });  };
}