var sw = {
  csdl: { ten: 'cntd', cap: 1 },
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
              rr = sw.upkey({}, cs.value.data);
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
          rs[k] = sw.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = sw.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs[k] = rr[k];
        } else if (rr[k].constructor === String) {
          if (rr[k].length > 0) {
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
          rs[k] = sw.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = sw.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs.push(rr[k]);
        } else if (rr[k].constructor === String) {
          if (rr[k].length > 0) {
            rs.push(rr[k]);
          }
        } else { }
      }
      rs = [...new Set(rs)];
      if (rs.length == 0) { return null; }
    } else if (rr.constructor === Number || rr.constructor === Boolean) {
      rs = rr;
    } else if (rr.constructor === String) {
      if (rr.length > 0) {
        rs = rr;
      } else {
        return null;
      }
    } else { }
    return rs;
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
                rs['refs'] = sw.upkey(rs['refs'], luu['refs']);
                rs['data'] = sw.upkey(rs['data'], luu['data']);
                rs['refs'] = sw.upkey({}, luu['refs']);
                rs['data'] = sw.upkey({}, luu['data']);
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
              luu['refs'] = sw.upkey({}, luu['refs']);
              luu['data'] = sw.upkey({}, luu['data']);
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
  gom: (bang, gom = null, gang = 0) => {
    gang = gang === '0' ? 0 : parseInt(gang) || -1;
    if (gang > 3) { self.postMessage({ cv: -1, kq: "bất quá tam" }); }
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { self.postMessage({ cv: -1, kq: "bảng chưa tạo" }); };
    let db, tr, rec, r, i, cs, k, kq,
      zr = 0,
      cv = 0;
    if (gom === undefined || gom === null) {
      gom = null;
      kq = [];
    } else if (gom.constructor === Array) {
      //makhoa
      kq = {};
      for (i in gom) { kq[gom[i]] = new Set(); }
    } else if (gom.constructor === Object) {
      //tim theo dieu kien
      kq = [];
    } else if (gom.constructor === String) {
      //makhoa
      gom = gom.split(' ').join('');
      if (gom.length < 1) {
        gom = null;
        kq = [];
      } else {
        kq = {};
        gom = [gom];
        kq[gom] = new Set();
      }
    } else {
      gom = null;
      kq = [];
    }
    try {
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
    } catch (err) { self.postMessage({ cv: cv, err: err }); }
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
    let db, tr, rec, r, i, cs, k, kq,
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


  old_gom: (bang, nam = 0) => {
    try {
      let db, cs, kq,
        cv = 1;
      indexedDB.open(sw.csdl.ten, sw.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              kq = cs.value;
              if (kq) {
                self.postMessage({ cv: cv, kq: kq });
                cv++;
              }
              cs.continue();
            } else {
              self.postMessage({ cv: -1, kq: null });
            }
          }
      }
    } catch (err) {
      self.postMessage({ cv: cv, err: err });
    };
  },
  old_nap1: {
    baogia: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              plgia = tin.nap.plgia.toString().toLowerCase(),
              baogia = tin.nap.baogia === '0' ? 0 : parseInt(tin.nap.baogia) || -1,
              chiphi = tin.nap.chiphi === '0' ? 0 : parseInt(tin.nap.chiphi) || -1,
              ce = new Date(baogia).getTime(),
              cs = parseInt(ce - 3600000 * 24 * 60);
            ce = parseInt(ce + 3600000 * 24);
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, r, kq, cv = 1;
            indexedDB.open("` + sw.csdl.ten + `",` + sw.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(IDBKeyRange.bound(cs, ce))
                .onsuccess = (e) => {
                  cs = e.target.result;
                  ce = 0;
                  if (cs) {
                    r = cs.value;
                    if (r.data.mabaogia > ce && r.data.mabaogia <= baogia && r.data.chiphi.id === chiphi && r.data.plgia === plgia) {
                      ce = r.data.mabaogia;
                      kq = Math.abs(r.data[plgia]) || 0;
                    }
                    cs.continue();
                  } else {
                    if (kq) { self.postMessage({ cv: cv, kq: kq }); }
                    self.postMessage({ cv: -1, kq: null });
                  }
                }
            }
          } catch (err) {
            self.postMessage({ cv: cv, err: err });
          };
        }`,
        blob = new Blob([sw], { type: "text/javascript" }),
        url = (window.URL || window.webkitURL).createObjectURL(blob);
      return url;
    },
    idutc: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              uid = tin.nap.idutc === '0' ? 0 : parseInt(tin.nap.idutc) || -1;
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, cs, kq, cv = 1;
            indexedDB.open("` + sw.csdl.ten + `",` + sw.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(IDBKeyRange.only(uid))
                .onsuccess = (e) => {
                  cs = e.target.result;
                  if (cs) {
                    kq = cs.value;
                    if (kq) { self.postMessage({ cv: cv, kq: kq }); }
                    cs.continue();
                  } else {
                    self.postMessage({ cv: -1, kq: null });
                  }
                }
            }
          } catch (err) {
            self.postMessage({ cv: cv, err: err });
          };
        }`,
        blob = new Blob([sw], { type: "text/javascript" }),
        url = (window.URL || window.webkitURL).createObjectURL(blob);
      return url;
    },
    makhoa: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              sma = tin.nap.sma.toString().toLowerCase(),
              vma = tin.nap.vma.toString().toLowerCase();
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, cs, kq, cv = 1;
            indexedDB.open("` + sw.csdl.ten + `",` + sw.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(null, 'prev')
                .onsuccess = (e) => {
                  cs = e.target.result;
                  if (cs) {
                    kq = cs.value;
                    try {
                      if (r.data.sma.toString().toLowerCase()===vma){
                        self.postMessage({ cv: cv, kq: kq });
                        self.postMessage({ cv: -1, kq: null });
                      }
                    } catch (err) {}
                    cs.continue();
                  } else {
                    self.postMessage({ cv: -1, kq: null });
                  }
                }
            }
          } catch (err) {
            self.postMessage({ cv: cv, err: err });
          };
        }`,
        blob = new Blob([sw], { type: "text/javascript" }),
        url = (window.URL || window.webkitURL).createObjectURL(blob);
      return url;
    },
  },




};


//main worker
self.onmessage = (ev) => {
  self.postMessage({ cv: 0, kq: "sw active" });
  try {
    let tin = ev.data,
      csdl_ten = tin.csdl.ten.toString().toLowerCase(),
      csdl_cap = tin.csdl.cap === '0' ? 0 : parseInt(tin.csdl.cap) || 0,
      bang = tin.bang.toString().toLowerCase();

    sw.csdl = { ten: csdl_ten, cap: csdl_cap };
    self.postMessage({ cv: 0, bang: bang, tin: tin });
    if ('baogia' in tin) {
      sw.nap1.baogia(bang, tin.baogia.chiphi, tin.baogia.baogia, tin.baogia.plgia);
    }
    if ('gom' in tin) { sw.gom(bang, tin.gom, tin.gang); }
    if ('nap1' in tin) { }
    if ('luu1' in tin || 'data1' in tin) { sw.data1(bang, tin.luu1, tin.gang); }
  } catch (err) {
    self.postMessage({ cv: -1, kq: "nothing to do" });
  };
}